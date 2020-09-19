const Joi = require('@hapi/joi'); //utilizzata per la validazione della forma dei dati in input.
const bcrypt = require('bcryptjs');
const mailer = require("../utilities/nodeMailer");
const sessionHandler = require('../utilities/sessionHandler');
const fileHandler = require('../utilities/fileHandler');



const accountDAO = require("./../dao/accountDAO");
const controllerAccount = require('./controllerAccount');
const passwordGenerator = require("generate-password");
const { response } = require('express');



// --- Funzioni per la gestione delle funzionalità degli account:
// --- Mostra area riservata
exports.accediAreaRiservata = function(req, res) { // ok
    accountDAO.getUtente(JSON.parse(req.body.sessionData).idUtente, function(datiReq, msg) {
        if (msg === "OK") {
            let datiUtente = datiReq[0];
            res.send({success : true, datiReq: datiUtente, message : "Ok"});
        }
        else if (msg === "NO_RESULT") {
            res.send({success: false, message: "Errore: non sono stati trovati dati relativi all'utente richiesto."});
        }
        else {
            res.send({success: false, message: "Errore nella richiesta dei dati dell'utente: " + msg});
        }
    });
}


// --- Modifica Password

/*
body:
-email
-newPassword
-oldPassword
è necessario che l'utente sia loggato
*/
exports.modificaPassword = function(req, res) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        oldPassword: Joi.string().min(1).max(255).required(),
        newPassword: Joi.string().min(1).max(255).required()
    });


    let obj = {
        email:req.body.email,
        oldPassword: req.body.oldPassword, 
        newPassword: req.body.newPassword
    }
    console.log(obj.email + " "+ obj.oldPassword + " " + obj.newPassword);
    const check = schema.validate(obj); //validazione 

    if (check.error === undefined) {
        accountDAO.richiediDatiAutenticazione(req.body.email, function(queryResult, msg) {
            if (msg === "OK") {
                bcrypt.compare(req.body.oldPassword, queryResult[0].password, function(err, isSame) {
                    if (isSame) {
                        bcrypt.hash(req.body.newPassword, 5, function(err, hashPassword) {
                            if (err) {
                                res.send({success: false, message: err});
                            }
                            else {
                                accountDAO.modificaPassword(queryResult[0].id_utente, hashPassword, function(result, msg) {
                                    if (msg == "OK") {
                                        res.send({success: true, message: "Password aggiornata correttamente"});
                                    }
                                    else {
                                        res.send({success: false, message: "Errore nella modifica della password: " + msg});
                                    }
                                }); 
                            }
                        });
                    }
                    else {
                        res.send({success: false, message: "Errore: la password vecchia non è corretta."});
                    }
                });
            }
            else {
                res.send({success: false, message: "Errore nella richiesta di autenticazione: " + msg});
            }
        });
    }
    else {
        res.send({success: false, message: "Errore: una delle password non è nel formato corretto."});
    }
}

// --- Modifica profilo:
/*
newEmail,    //in newEmail, se non la si vuole cambiare, si può rimandare la vecchia email
idUtente
nome,
cognome
*/

//OK
exports.modificaProfilo = function(req, res) {  
                controllerAccount.checkLogged(req, function(result,msg0){
                    
                    if (msg0 == "OK"){ //e' loggato.
                        const schema = Joi.object({
                                            newEmail : Joi.string().min(1).max(255).required()
                                        });
                                    
                                        let obj = {
                                            newEmail : req.body.newEmail
                                        }
                                    
                                        const check = schema.validate(obj); //validazione 
                                        console.log("Loggato e validato");
                                        if(check.error === undefined){
                                            console.log(req.body.newEmail+" //// "+req.body.email+" //// "+req.body.nome+" //// "+req.body.cognome)
                                            accountDAO.modificaProfiloUtente(req.body.newEmail, req.body.idUtente, req.body.nome, req.body.cognome, 
                                                function(queryResult, msg2) {
                                                if (msg2 === "OK") {
                                                    //console.log(queryResult[0]+" //// "+queryResult[1]);
                                                    res.send({success: true, message: "Profilo modificato con successo"});
                                                }
                                                else {                                                   
                                                    res.send({success: false, message: "Errore nella modifica del profilo: " + msg2});
                                                }
                                            });
                                        }
                                        else{
                                            console.log(check.error);
                                            res.send({success: false, message: "Errore: l'email inserita non è valida"});
                                        }
                                    
                    }
                    else{
                        
                        res.send({success : false, message : "Utente non loggato"});
                    }
               
               
});
}

// --- Diventa Host

// DA TESTARE---> DA ELIMINARE
exports.diventaHost = function(req, res) {
    if (req.file) {
        fileHandler.controllaEstensioneFile(req.file.originalname, [".png", ".jpg", ".jpeg", ".pdf"], function(isValid) {
            if (isValid) {
                controllerAccount.checkIfLoggedIn_body(req, function(msgLogin) {
                    if (msgLogin === "OK") {

                        let schema = Joi.object({
                            cf: Joi.string().min(16).max(16).required(),
                            tipo: Joi.string().required()
                        });
                        sess = JSON.parse(req.body.sessionData);
                        cf = req.body.codiceFiscale;
                        tipo = req.body.tipoDocumento;
                    
                        let check = schema.validate({
                            cf: cf,
                            tipo: tipo
                        });
                    
                        if (check.error === undefined) {
                            accountDAO.richiediInfoAutenticazione(sess.email, function(autResult, msg) {
                                if (msg === "OK") {
                                    let prevDoc = null;
                                    // if documento già caricato, si elimina quello già presente
                                    prevDoc = qResult[0].scansioneDocumento;
                                        
                                    accountDAO.diventaHost(sess.idUtente, cf, req.file.filename, tipo, function(insResult, msg) {
                                        if (msg === "OK") {                                           
                                                fileHandler.eliminaDocHost(prevDoc, function(msg) {
                                                    console.log(msg);
                                                });
                                            res.send({success: true, message: "Richiesta eseguita con successo!"});
                                        }
                                        else {
                                            fileHandler.eliminaDocHost(req.file.filename, function(msg) {
                                                console.log(msg);
                                            });
                                            res.send({success: false, message: "Errore nell'aggiunta dei dati dell'host: " + msg});
                                        }
                                    });
                                }
                                else if (msg == "NO_RESULT") {
                                    fileHandler.eliminaDocHost(req.file.filename, function(msg) { //si elimina il file caricato, poichè non valido
                                        console.log(msg);
                                    });
                                    res.send({success: false, message: "Utente non esistente."});
                                }
                                else {
                                    fileHandler.eliminaDocHost(req.file.filename, function(msg) { //si elimina il file caricato, poichè non valido-------------------- ecc...
                                        console.log(msg);
                                    });
                                    res.send({success: false, message: "Errore nella richiesta dei dati di autenticazione: " + msg});
                                } 
                            });
                        }   
                        else { 
                            fileHandler.eliminaDocHost(req.file.filename, function(msg) {
                                console.log(msg);
                            });
                            res.send({success: false, message: "Errore: i dati non sono validi."});
                        }
            
                    }
                    else {
                        fileHandler.eliminaDocHost(req.file.filename, function(msg) {
                            console.log(msg);
                        });
                        res.send({success: false, message: "Errore: utente non loggato."});
                    }
                });
            }
            else {
                res.send({success: false, message: "Errore: l'estensione del file inserito non è valida."});
            }
        });
    }
    else {
        res.send({success: false, message: "Errore: non è stato caricato alcun file."});
    }
}

// --- Elimina Account
/*
req.body:
email
*/


//OK
exports.eliminaAccount = function(req, res) {

    accountDAO.richiediDatiAutenticazione(req.body.email, function(result, msg) { // id_utente, email, password, amministratore FROM utenti U WHERE email = ?";
    console.log("email: "+req.body.email);
        if (msg === "OK") {
            console.log("debug 1");
            accountDAO.eliminaUtente(result[0].id_utente, function(result2, msg) {
                if (msg === "OK") {
                    sess={
                        idUtente: result[0].id_utente
                    }
                    //pulizia delle sessioni, se l'utente era loggato
                    if(result[0].amministratore==0){ //se non è admin
                        sessionHandler.cancellaSessione(sess);
                        res.send({success: true, message: "Utente eliminato con successo."});
                    }
                    else{ //se è admin
                        sessionHandler.cancellaSessioneAdmin(sess);
                        res.send({success: true, message: "Admin eliminato con successo."});
                    }
                }
                else {
                    res.send({success: false, message: "Errore nell'eliminazione dell'account: " + msg});
                }
            });
        }                               
        else if (msg == "NO_RESULT") {
            res.send({success: false, message: "Errore: utente non presente"});
        }
        else {
            res.send({success: false, message: "Errore nella richiesta dei dati di autenticazione: " + msg});
        }
    });
}



/*
req.body:
idUtente
*/
exports.richiediPrenotazioniEffettuate = function(req, res) { //OK, funziona
    accountDAO.richiediPrenotazioniEffettuate(req.body.idUtente, function(result,msg){
        if(msg=="OK"){
            res.send({success: true, result: result[0]});
        }
        else{
            res.send({success: false, message: "Errore nella richiesta delle prenotazioni: " + msg});
        }
    })


}

// --- Visualizza prenotazioni ricevute
exports.richiediPrenotazioniRicevute = function(req, res) {
    sess = JSON.parse(req.query.sessionData);

    accountDAO.richiediPrenotazioniRicevute(sess.idUtente, function(prenotazioniDaValutare, msgA) {
        if (msgA === "OK" || msgA === "NO_RESULT") {
            accountDAO.richiediPrenotazioniRicevute_Archiviate(sess.idUtente, function(prenotazioniArchiviate, msgB) {
                if (msgB === "OK" || msgB === "NO_RESULT") {
                    accountDAO.richiediPrenotazioniRicevute_DaEstinguere(sess.idUtente, function(prenotazioniDaEstinguere, msgC) {
                        if (msgC === "OK" || msgC === "NO_RESULT") {
                            let prenDaValutare = [];
                            let prenArchiviate = [];
                            let prenDaEstinguere = [];
                            if (msgA === "OK") {
                                prenDaValutare = prenotazioniDaValutare;
                            }
                            if (msgB === "OK") {
                                prenArchiviate = prenotazioniArchiviate;
                            } 
                            if (msgC === "OK") {
                                prenDaEstinguere = prenotazioniDaEstinguere;
                            } 

                            res.send({
                                success: true, 
                                prenotazioniDaValutare: JSON.stringify(prenDaValutare), 
                                prenotazioniArchiviate: JSON.stringify(prenArchiviate), 
                                prenotazioniDaEstinguere: JSON.stringify(prenDaEstinguere), 
                                message: "Prenotazioni trovate!"
                            });
                        }
                        else {
                            res.send({
                                success: false,  
                                message: "Errore nella richiesta delle prenotazioni da estinguere: " + msgC
                            });
                        }
                    });
                    
                }
                else {
                    res.send({
                        success: false,  
                        message: "Errore nella richiesta delle prenotazioni archiviate: " + msgB
                    });
                }
            });   
        }
        else {
            res.send({
                success: false,  
                message: "Errore nella richiesta delle prenotazioni da valutare: " + msgA
            });
        }
    });
}


// --- Funzioni per la gestione di Autenticazione:

exports.prova=function(req,res){
    console.log("-----------------------------------------------\n", req.body);
    console.log("Testo: ",req.body.testo);
    console.log("Ricevuto: \n"+req.body.email+" "+req.body.password);

    //console.log(req);
    data={"success":true, "message":"Ciao Licari"};
    res.status(200).send(data);
}


// Funzione per il prelevamento di tutti gli utenti
exports.getUtenti=function(req, res){
    accountDAO.prendiUtenti(function (result,msg){
       console.log(result);
       console.log(msg);
       res.send({risultati :result});

    });
}


// Funzione per l'inserimento di un utente nel DB
exports.creaUtente = function(req, res) {
    const schema = Joi.object({
        email : Joi.string().max(255).email().required(), 
        nome : Joi.string().min(2).max(50).required(),
        cognome : Joi.string().min(2).max(50).required(),
        password : Joi.string().min(1).max(255).required(),
    });
    const result = schema.validate(req.body); //validazione dei dati
    if (result.error === undefined) { //se non ci sono errori procedo , altrimenti mando un errore
        
        const data = req.body;

        accountDAO.checkEsistenzaUtente(data.email, function(exists) {
            if (!exists) {
                bcrypt.hash(data.password, 5 , function(err, hashPassword) {
                    accountDAO.inserisciUtente(data.email, data.nome, data.cognome, hashPassword, function(result, msg) {
                        if (msg === "OK") {                            
                            //invio email 
                            mailer.inviaMail(req.body.email, 
                                'ReadyTravel - Registrazione Account',
                                'Benvenuto ' + req.body.nome + " " + req.body.cognome + 
                                "\nGrazie per esserti iscritto al nostro sito, "+ req.body.nome + " " + req.body.cognome + " \n" + "Buona permaneneza sul nostro sito\n",
                                function(error, response) {
                                if (response == "250 Ok") {
                                    console.log("Invio email effettuato");
                                    res.send({success : true, message: "Utente registrato e email inviata con successo"});
                                }
                                else {
                                    console.log("Invio email fallito"+error);
                                    res.send({success : false, message: "Utente registrato ma errore nell'invio della mail: " + error});
                                }
                            });                         
                        }
                        else {
                            console.log(err);
                            res.send({success : false, message: "Errore nell'inserimento dell'utente:" + msg});
                        }
                    });
                });
            }
            else {
                res.send({success: false, message: "Errore: esiste già un utente con l'e-mail inserita"});
            }
        });
    }
    else {//console.log("errore dati inseriti\n",error.details[0].message);
        res.send({success: false, message: "Errore: " + result.error.details[0].message});
    }
}







/*
req.body:
email
password
---------------------------------------------------
ritorno: sessione
idUtente : queryResult[0].id_utente,
email : queryResult[0].email,
amministratore: queryResult[0].amministratore
*/



// Funzione per effettuare il login dell'utente
exports.loginUtente = function(req, res) { //////////// IDEA : utilizzare e restituire un token casuale (e temporizzato) ////
    

    const schema = Joi.object({
        email : Joi.string().email(),
        password : Joi.string()
    });

    obj={
        email: req.body.email,
        password: req.body.password
    }
    
    const result = schema.validate(obj);

    if (result.error === undefined) {
        accountDAO.richiediDatiAutenticazione(req.body.email, function(queryResult, msg) {
            
            if (msg == "OK") {
               
                bcrypt.compare(req.body.password, queryResult[0].password, function(err, uguale) {
                if (uguale) {
                    let dat = {
                    idUtente : queryResult[0].id_utente,
                    email : queryResult[0].email,
                    amministratore: queryResult[0].amministratore
                    };

                    if(! (dat.amministratore) ){
                        
                        risultato=sessionHandler.esisteSessione(dat); //VERIFICO SE UNA SESSIONE E' GIA' PRESENTE, in caso non permetto l'accesso
                        if(!risultato){
                            
                            sessionHandler.aggiungiSessione(dat);
                            console.log("SESSIONE UTENTE INSERITA");
                            res.send({success : true, session : dat, message : "Utente loggato", idUtente: dat.idUtente, amministratore: dat.amministratore, email: dat.email});
                        }
                        else{

                            sessionHandler.cancellaSessione(dat);
                            console.log("SESSIONE VECCHIA RIMOSSA");
                            sessionHandler.aggiungiSessione(dat);
                            console.log("SESSIONE UTENTE INSERITA");
                            res.send({ success: false, session: dat, message: "Utente ri-loggato", idUtente: dat.idUtente, amministratore: dat.amministratore, email: dat.email});
                        }
                    }
                    else{
                        risultato=sessionHandler.esisteSessioneAdmin(dat); //VERIFICO SE UNA SESSIONE E' GIA' PRESENTE, in caso non permetto l'accesso
                        if(!risultato){
                            sessionHandler.aggiungiSessioneAdmin(dat);
                            console.log("SESSIONE ADMIN INSERITA");
                            res.send({ success: true, session: dat, message: "Admin loggato con successo", idUtente: dat.idUtente, amministratore: dat.amministratore, email: dat.email});
                        }
                        else{

                            sessionHandler.cancellaSessioneAdmin(dat);
                            console.log("SESSIONE VECCHIA RIMOSSA GIA' PRESENTE");
                            sessionHandler.aggiungiSessioneAdmin(dat);
                            console.log("SESSIONE ADMIN INSERITA");
                            res.send({ success: false, session: dat, message: "Admin ri-loggato", idUtente: dat.idUtente, amministratore: dat.amministratore, email: dat.email});
                        }
                    }     
                }
                else{
                    res.send({success : false, message : "Errore: Email o password errate"});
                }
            });
        }
        else{
            res.send({success : false, message : "Errore: Email o password errate"});
        }
        });
    }
    else {console.log(result.error);
        res.send({success : false, message : "Errore: l'email non è in un formato valido."});
    }
}

// Funzione per il logout
exports.logoutUtente = function(req, res) {
    sessione=req.body;
    console.log(sessione);
    risultato1=sessionHandler.esisteSessione(sessione);
    risultato2=sessionHandler.esisteSessioneAdmin(sessione);
    if(risultato1)
        {sessionHandler.cancellaSessione(sessione);
        res.send({success : true, message : "Logout eseguito con successo."});
        }
    else if(risultato2)
        {sessionHandler.cancellaSessioneAdmin(sessione);
            res.send({success : true, message : "Logout eseguito con successo."});
        }
    else
        res.send({success: false, message: "Sessione non trovata"});
}


// Funzione per il recupero della password -> genera automaticamente una password
exports.recuperoPassword = function(req, res) {
    const schema = Joi.object({
        email : Joi.string().email()
    });
    console.log(req.body.email);
    const result = schema.validate(req.body);

    if (result.error === undefined) {
         newPassword = passwordGenerator.generate({length : 10, numbers : true, uppercase : true,lowercase : true
        });

        accountDAO.checkEsistenzaUtente(req.body.email, function(exists) {
            if (exists) {
                bcrypt.hash(newPassword, 5, function(err, hashPassword) {
                    accountDAO.aggiornaPassword(req.body.email, hashPassword, function(result, msg) {
                        if (msg == 'OK') {
                            //invioEmail
                            
                            //destinatario,titolo,corpo,callback
                            mailer.inviaMail(req.body.email, 
                                'ReadyTravel - Recupero Password',
                                "E' stata effettuata una richiesta di recupero password relativamente al tuo account.\n La tua nuova password è: "+ newPassword,
                                function(error, response) {
                                if (response == "250 Ok") {
                                    res.send({success : true, message : "Password reimpostata. La nuova password è stata inviata all'indirizzo email associato al tuo account"});
                                }
                                else {
                                    res.send({success : false, message : "Errore nell'invio della e-mail: " + error});
                                }
                            
                            });
                            //res.send("La tua nuova password è: "+newPassword); //Non inviare la nuova password cos', ma per email. Nella versione finale mandare email
                            
                        }
                        else {
                            res.send({success : false, message : "Errore nell'aggiornamento password: " + msg});
                        }
                    }); 
                });
            }
            else {
                res.send({success: false, message: "Non esiste un utente con la e-mail inserita."});
            }
        });
    }
    else {
        res.send({success : false, message : "Errore: l'email non è in un formato valido."});
    }
}



// DA VERIFICARE
// Funzione per controllare se l'utente (o l'admin) è loggato 

/*
sessionData:{
idUtente
amministratore
}
*/


exports.checkIfLoggedIn = function(req, res, next) {
    if (req.query.sessionData) {
        sess = JSON.parse(req.query.sessionData);
        if (sessionHandler.esisteSessione(sess)) {
            next();
        }
        else {
            res.send({success : false, message : "Errore: utente non loggato."});
        }
    }
    else {
        res.send({success : false, message : "Errore: non è presente una sessione."});
    }
}

/*
req.body:
idUtente
amministratore
*/



exports.checkLogged=function(req, callback){ //ok
    if(req.body.amministratore==0) {
        console.log("Checklog: "+req.body.amministratore);
        risultato=sessionHandler.esisteSessione(req.body);
        if(risultato){
            console.log(req.body.idUtente+" : utente trovato");
            callback(undefined,"OK");
        }
        else{
            console.log(req.body.idUtente+" Utente non trovato");
            callback(undefined,"NO_MATCH");
        }
    }
    else{
        risultato=sessionHandler.esisteSessioneAdmin(req.body);
        if(risultato){
            console.log(req.body.idUtente+" : admin trovato");
            callback(undefined,"OK");
        }
        else{
        console.log(req.body.idUtente+" : admin non trovato");
        callback(undefined,"NO_MATCH");
        }

    }  
}


/*
req.body:
idUtente
amministratore
*/


exports.checkLoggedRes=function(req,res){ //ok

    if(req.body.amministratore==0) {
        console.log("Checklog: ");
        risultato=sessionHandler.esisteSessione(req.body);
        if(risultato){
            console.log(req.body.idUtente+" : utente trovato");
            res.send({success: true, message:"LOGGED"});
        }
        else{
            console.log(req.body.idUtente+" Utente non trovato");
            res.send({success: false, message:"NO MATCH"});
        }
    }
    else{
        risultato=sessionHandler.esisteSessioneAdmin(req.body);
        if(risultato){
            console.log(req.body.idUtente+" : admin trovato");
            data={success: true, message:"LOGGED"}
            res.send({success: true, message:"LOGGED"});
        }
        else{
        console.log(req.body.idUtente+" : admin non trovato");
        res.send({success: false, message:"NO MATCH"});
        }

    } 

}



exports.richiediUtenteSessione = function(req, res) {
    sess = JSON.parse(req.body.sessionData);
    if (sess) {
        accountDAO.getUtente(sess.idUtente, function (result, msg){
            if (msg == 'OK') {
                
                res.send({success : true, data : JSON.stringify(result[0])});
            }
            else {
                res.send({success : false, data : undefined, message: "Errore nella richiesta dei dati dell'utente: " + msg});
            }
        }); 
    }
    else {
        res.send({success : false, message : "Errore: non è presente una sessione attiva."});
    }
}