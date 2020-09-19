const fileHandler = require('../utilities/fileHandler');
const Joi = require('@hapi/joi');
const controllerAccount = require('./controllerAccount');
const accountDAO = require('../dao/accountDAO');
const prenotazioniDAO = require('../dao/prenotazioniDAO');
const alloggiDAO = require('../dao/alloggiDAO');
const mailer = require('../utilities/nodeMailer');
const moment = require('moment'); //libreria di utilità per le date


const calcolaDiffDate = function(date1, date2) {
    const data1 = moment(date1).valueOf();
    const data2 = moment(date2).valueOf();
    const diffTempo = Math.abs(data2 - data1);
    const diffGiorni = Math.max(1, Math.ceil(diffTempo / (1000 * 60 * 60 * 24)));
    return diffGiorni;
}

const convertDate = function(date) {
    let d = new Date(date);
    return [d.getFullYear(), d.getMonth()+1, d.getDate()].join('/');
}

exports.getPrenotazioniAttesa=function(req, res){ //OK
    prenotazioniDAO.getPrenotazioniAttesa(req.body.idUtente, function(result, msg){
        if (msg==="OK")
            {
                console.log(result)
                console.log("MSG"+msg)
                res.send({success: true, data: result, message: "Lista delle prenotazioni in attesa"});
            }
        else{
            console.log(result)
            res.send({success: false, data: undefined, message: "errore: "+msg});
        }
    });
}

exports.getPrenotazioniAccettateDeclinateConfermate=function(req, res){
    console.log(req.body.idUtente);
    prenotazioniDAO.getPrenotazioniAccettateDeclinateConfermate(req.body.idUtente, function(result, msg){
        if (msg==="OK")
            {
                res.send({success: true, data: result, message: "Lista delle prenotazioni accettate e declinate"});
            }
        else{
            res.send({success: false, data: undefined, message: "errore: "+msg});
        }
    });
}

exports.getPrenotazioniAccettateDeclinateConfermateHost=function(req, res){
    prenotazioniDAO.getPrenotazioniAccettateDeclinateConfermateHost(req.body.idUtente, function(result, msg){
        if (msg==="OK")
            {
                res.send({success: true, data: result, message: "Lista delle prenotazioni accettate e declinate"});
            }
        else{
            res.send({success: false, data: undefined, message: "errore: "+msg});
        }
    });
}

exports.getPrenotazioniAttesaHost=function(req, res){ //OK
    prenotazioniDAO.getPrenotazioniAttesaHost(req.body.idUtente, function(result, msg){
        if (msg==="OK")
            {
                res.send({success: true, data: result, message: "Lista delle prenotazioni in attesa"});
            }
        else{
            res.send({success: false, data: undefined, message: "errore: "+msg});
        }
    });
}




// DATI PRENOTAZIONE CASA
/*
req.body:
checkin -> data
checkout -> data
importo
tasse
interiEsenti
ridottiEsenti
idAlloggio
idUtente
*/



// DATI PRENOTAZIONE BNB

       
/*
req.body:
amministratore -> indica se l'utente è amministratore o meno (presente nei dati di sessione)
checkin -> data
checkout -> data
importo
tasse
interiEsenti
ridottiEsenti
idAlloggio
idUtente //proprietario
tipoPagamento

//stanze --> le stanze che sono richieste
singoleRic 
doppieRic
tripleRic
quadrupleRic
*/



exports.effettuaPrenotazione= function (req,res){

    //CONTROLLI PER LA VALIDITA' DELLE DATE
    let data1 = req.body.checkin;
    let data2= req.body.checkout;
    data1=convertDate(data1);
    let dataOggi = new Date();
    data2=convertDate(data2);
    dataOggi=convertDate(dataOggi);

    console.log(data1);
    console.log(data2);
    console.log(dataOggi);
    console.log(req.body)


     data11 = moment(data1).valueOf();
     data22 = moment(data2).valueOf();
    console.log("OOO");
     diff1=data22-data11;
     data33 = moment(dataOggi).valueOf();
     diff2=data11-data33;

    if(diff1<0){
        res.send({success: false, message: "Inserire delle date valide: la data di inizio prenotazione non può essere successiva a quella di fine prenotazione"});
    }
    else if(diff2<0){
        res.send({success: false, message: "Inserire delle date valide: la data di inizio prenotazione non può essere antecedente ad oggi"});
    }
    //FINE CONTROLLI SULLE DATE
    else{

    if (req.body.bnb==0)
        {
                // --- Prenotazione Casa                    
                    controllerAccount.checkLogged(req, function(r1,msg) {
                        if (msg === "OK") { //validazione dei dati
                            console.log(req.body);
                        const schema = Joi.object({
                            checkin: Joi.required(),
                            checkout: Joi.required(),
                            importo: Joi.required(),
                            tasse: Joi.required(),
                            interiEsenti: Joi.required(),
                            ridottiEsenti: Joi.required()
                            });
                            
                         obj = {
                            checkin: req.body.checkin,
                            checkout: req.body.checkout,
                            importo: req.body.importo,
                            tasse: req.body.tasse,
                            interiEsenti: req.body.interiEsenti,
                            ridottiEsenti: req.body.ridottiEsenti
                            };
                        
                        const check = schema.validate(obj);
                        if(check.error === undefined){
                            prenotazioniDAO.checkDisponibilitaCasa(req.body.idAlloggio, req.body.checkin, req.body.checkout, function(result, msg) { //verifica necessaria per ad ogni tentativo di prenotazione
                                            if (msg === "NO_RESULT") { //msg=="NO_RESULT"
                                                prenotazioniDAO.checkTotGiorni(req.body.idUtente, req.body.idAlloggio, function(giorniTotali, msg) {
                                                    if (msg === "OK") {
                                                        if (giorniTotali[0].tot_giorni + calcolaDiffDate(req.body.checkin, req.body.checkout) > 28) { //In questo caso, il sistema blocca la prenotazione ed elimina i file.
                                                            res.send({success: false, message: "Errore: L'utente sta provando a prenotatare lo stesso alloggio per più di 28 giorni in un anno"});
                                                        }
                                                        else { //se è possibile prenotare->
                                                                
                                                                            // --- Serie di funzioni finalizzate all'invio delle mail --- //
                                                                            // BISOGNA MANDARE UN'EMAIL A CLIENTE E PROPRIETARIO
                                                                                    prenotazioniDAO.richiediAlloggioById(req.body.idAlloggio, function(result1, msg) { //trovo l'email del proprietario
                                                                                        if (msg === "OK") {
                                                                                            if(result1[0].ref_proprietario != req.body.idUtente){
                                                                                                prenotazioniDAO.aggiungiPrenotazioneCasa(req.body.idAlloggio, req.body.idUtente, //NB, è possibile la casa anche se si è proprietari.
                                                                                                    req.body.checkin, req.body.checkout, req.body.nInteri, req.body.nRidotti, req.body.importo, req.body.tasse,
                                                                                                    req.body.interiEsenti, req.body.ridottiEsenti, req.body.tipo_pagamento, function(result, msg) {
                                                                                                        if (msg === "OK") {
                                                                                                            alloggiDAO.richiestaAlloggio(req.body.idAlloggio, function(result2, msg) { //trovo il nome dell'alloggio
                                                                                                                if (msg === "OK") {
                                                                                                                    console.log(result2[0].nome_alloggio)
                                                                                                                    // Invia mail di riepilogo all'utente
                                                                                                                    mailer.inviaMail(result1[0].email, "Richiesta di prenotazione effettuata",
                                                                                                                    "E' stata effettuata la richiesta di prenotazione per la casa " + result2[0].nome_alloggio +
                                                                                                                    "\nSarai informato quando ci saranno aggiornamenti riguardanti la tua prenotazione\n",
                                                                                                                    function(error, message) {
                                                                                                                        console.log(message);
                                                                                                                    }
                                                                                                                    );
                                                                                                                    

                                                                                                                    //invio email al proprietario
                                                                                                                    mailer.inviaMail(result2[0].email, "Richiesta di prenotazione in arrivo",
                                                                                                                    "E' arrivata una nuova richiesta di prenotazione per la casa '"
                                                                                                                    + result2[0].nome_alloggio + "'.\n" +
                                                                                                                    "Puoi vedere meglio i dettagli della prenotazione accedendo alla piattaforma",
                                                                                                                    function(error, message) {
                                                                                                                        console.log(message);
                                                                                                                    });

                                                                                                                    res.send({success: true, message: "Prenotazione effettuata con successo!"});
                                                                                                                }
                                                                                                                else {
                                                                                                                    
                                                                                                                    res.send({success: false, message: "Errore nella richiesta dell'alloggio"});
                                                                                                                    console.log(msg);
                                                                                                                    return false;
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        else {
                                                                                                            res.send({success: false, message: "Errore: Impossibile aggiungere la prenotazione"});
                                                                                                            console.log(msg);
                                                                                                            return false;
                                                                                                        }
                                                                                                    });
                                                                                            }
                                                                                            else {                       
                                                                                                res.send({success: false, message: "Errore: Impossibile prenotare una propria abitazione"});
                                                                                                }
                                                                                        }
                                                                                    });
                                                        }
                                                    }
                                                });
                                            }
                                            else{
                                                res.send({success: false, message: "La casa non è disponibile"});
                                            }
                                        });
                        }
                        else{
                            res.send({success: false, message: "Errore nella validazione dei dati della request"});
                        }             
                    }
                    else{
                        res.send({success: false, message: "Utente non loggato"});
                    }
                });
           
        }
    else if (req.body.bnb==1){
                       // exports.prenotazioneBnB = function(req, res) {  //OK
                            console.log("prenotazioneBNB");
                            controllerAccount.checkLogged(req, function(r1,msg) {
                                if (msg === "OK") { //validazione dei dati
                                    console.log(req.body);
                                const schema = Joi.object({
                                    checkin: Joi.required(),
                                    checkout: Joi.required(),
                                    importo: Joi.required(),
                                    tasse: Joi.required(),
                                    interiEsenti: Joi.required(),
                                    ridottiEsenti: Joi.required()
                                    });
                                    
                                 obj = {
                                    checkin: req.body.checkin,
                                    checkout: req.body.checkout,
                                    importo: req.body.importo,
                                    tasse: req.body.tasse,
                                    interiEsenti: req.body.interiEsenti,
                                    ridottiEsenti: req.body.ridottiEsenti
                                    };
                                
                                const check = schema.validate(obj);
                                if(check.error === undefined){
                                    alloggiDAO.richiestaAlloggio(req.body.idAlloggio,function(datiAlloggio, msg1){
                                    if (msg1=="OK")
                                    {
                                    prenotazioniDAO.getStanzeDisponibili(req.body.idAlloggio, req.body.checkin, req.body.checkout, 
                                        function(result, msg) { //verifica necessaria per ad ogni tentativo di prenotazione. La funzione ritorna il numero di stanze disponibili per ogni tipologia ammessa.
                                            console.log("result0");
                                            console.log(result[0]);
                                                if (
                                                
                                                            (msg === "OK"
                                                                    && 
                                                                    result[0].singoleDisp!=null
                                                                    &&
                                                                (
                                                                result[0].singoleDisp - req.body.singoleRic >= 0 //verifica se il numero e il tipo di stanze richiesto è disponibile
                                                                && result[0].doppieDisp - req.body.doppieRic >= 0
                                                                &&  result[0].tripleDisp - req.body.tripleRic >= 0
                                                                && result[0].quadrupleDisp - req.body.quadrupleRic >= 0
                                                                ) 
                                                                &&
                                                                (
                                                                    (req.body.singoleRic > 0) || (req.body.doppieRic >0) || (req.body.tripleRic) >0 || (req.body.quadrupleRic>0) //verifica che non si effetuino prenotazioni vuote 
                                                                )
                                                            )
                                                            ||
                                                            (
                                                                msg==="OK"
                                                                &&
                                                                result[0].singoleDisp==null
                                                            )
                                                    ){
                                                    
                                                        prenotazioniDAO.checkTotGiorni(req.body.idUtente, req.body.idAlloggio, function(giorniTotali, msg) { //verifica se il tempo di permanenza annuale nell'alloggio supera i 28 giorni
                                                            if (msg === "OK") {
                                                                if (giorniTotali[0].tot_giorni + calcolaDiffDate(req.body.checkin, req.body.checkout) > 28) { //In questo caso, il sistema blocca la prenotazione ed elimina i file.
                                                                    res.send({success: false,
                                                                        message: "Errore: L'utente sta provando a prenotatare lo stesso bnb per più di 28 giorni in un anno"}
                                                                        );
                                                                }
                                                                else { //se è possibile prenotare->   
                                                                                    // INVIO DELL'EMAIL A CLIENTE E PROPRIETARIO
                                                                                            prenotazioniDAO.richiediAlloggioById(req.body.idAlloggio, function(result1, msg) {
                                                                                                 //trovo l'email del proprietario
                                                                                                if (msg === "OK") {
                                                                                                    if(result1[0].ref_proprietario != req.body.idUtente){ // ci si assicura che l'utente non possa prenotare per un alloggio che è di sua proprietà.
                                                                                                        prenotazioniDAO.aggiungiPrenotazioneBnB(req.body.idAlloggio, req.body.idUtente, 
                                                                                                            req.body.checkin, req.body.checkout, req.body.nInteri, req.body.nRidotti, req.body.importo, req.body.tasse,
                                                                                                            req.body.interiEsenti, req.body.ridottiEsenti, req.body.tipo_pagamento, req.body.singoleRic,req.body.doppieRic,req.body.tripleRic,req.body.quadrupleRic, function(result, msg) {

                                                                                                                if (msg === "OK") {
                                                                                                                    alloggiDAO.richiestaAlloggio(req.body.idAlloggio, function(result2, msg) { //trovo il nome dell'alloggio
                                                                                                                        if (msg === "OK") {
                                                                                                                            
                                                                                                                            // Invia email all'utente che effettua la prenotazione
                                                                                                                            mailer.inviaMail(result1[0].email, "Richiesta di prenotazione effettuata",
                                                                                                                            "E' stata effettuata la richiesta di prenotazione per il BnB '" + result2[0].nome_alloggio +
                                                                                                                            "\nSarai informato quando ci saranno aggiornamenti riguardanti la tua prenotazione\n",
                                                                                                                            function(error, message) {
                                                                                                                                console.log(message);
                                                                                                                            }
                                                                                                                            );
                                                                                                                            
                                                                                                                            //invio email al proprietario
                                                                                                                            mailer.inviaMail(result2[0].email, "Richiesta di prenotazione in arrivo",
                                                                                                                            "E' arrivata una nuova richiesta di prenotazione per il BnB '"
                                                                                                                            + result2[0].titolo + "'.\n" +
                                                                                                                            "Puoi vedere meglio i dettagli della prenotazione accedendo alla piattaforma",
                                                                                                                            function(error, message) {
                                                                                                                                console.log(message);
                                                                                                                            });

                                                                                                                            res.send({success: true, message: "Prenotazione effettuata con successo!"});
                                                                                                                        }
                                                                                                                        else {
                                                                                                                            
                                                                                                                            res.send({success: false, message: "Errore nella richiesta dell'alloggio"});
                                                                                                                            console.log(msg);
                                                                                                                            return false;
                                                                                                                        }
                                                                                                                    });
                                                                                                                }
                                                                                                                else {
                                                                                                                    res.send({success: false, message: "Errore: Impossibile aggiungere la prenotazione"});
                                                                                                                    console.log(msg);
                                                                                                                    return false;
                                                                                                                }
                                                                                                            });
                                                                                                    }
                                                                                                    else {                       
                                                                                                        res.send({success: false, message: "Errore: Impossibile prenotare una propria abitazione"});
                                                                                                        }
                                                                                                }
                                                                                                else{
                                                                                                    res.send({success: false, message: "errore"+msg});
                                                                                                }
                                                                                            });
                                                                }
                                                            }
                                                            else{
                                                                res.send({success: false, message: "errore "+msg});
                                                            }
                                                            
                                                        });
                                                    }
                                                    else{
                                                        res.send({success: false, message: "Il bnb non è disponibile"});
                                                    }
                                                });
                                    
                                }
                                else{
                                    res.send({success: false, message: "Errore nella richiesta dei dati del'alloggio"});
                                } 
                            });
                                             
                            }
                            else{
                                res.send({success: false, message: "Utente non loggato"});
                            }  
                }

            });
        }
    }
}
/*
req.body:
idPrenotazione

*/

// --- Accetta Prenotazione
exports.accettaPrenotazione = function(req, res) {
    const schema = Joi.object({
        idPrenotazione: Joi.required()
        });
        
     obj = {
       idPrenotazione : req.body.idPrenotazione
        };
    
    const check = schema.validate(obj);
    if(check.error==undefined)
    {
    prenotazioniDAO.accettaPrenotazione(req.body.idPrenotazione, function(result, msg) {
        if (msg === "OK") {
            prenotazioniDAO.richiediDatiPrenotazione(req.body.idPrenotazione, function(datiPrenotazione, msg) {
                if (msg === "OK") {
                    console.log("Dati prenotazione: ");
                    console.log(datiPrenotazione);
                    alloggiDAO.richiestaAlloggio(datiPrenotazione[0].ref_alloggio, function(datiAlloggio, msg) {
                        if (msg === "OK") {
                            accountDAO.getUtente(datiPrenotazione[0].ref_utente, function(datiUtente, msg) {
                                if (msg === "OK") {
                                    mailer.inviaMail(datiUtente[0].email, "Prenotazione accettata", 
                                    "Ti comunichiamo che la tua prenotazione per l'alloggio " +
                                    datiAlloggio[0].nome_alloggio + " per il periodo dal " + 
                                    convertDate(datiPrenotazione[0].d_inizio) + " al " + convertDate(datiPrenotazione[0].d_fine) + " è stata accettata dall'host.\n",
                                    function(error, message) {
                                        console.log(message);
                                    });
                                }
                                else {
                                    console.log(msg);
                                    return false;
                                }
                            });
                        }
                        else {
                            console.log(msg);
                            return false;
                        }
                    });
                }
                else {
                    console.log(msg);
                    return false;
                }
            });

            res.send({success: true, message: "Prenotazione accettata con successo!"});
        }
        else {
            res.send({success: false, message: "Errore nell'accettazione della prenotazione: " + msg});
        }
    });
 }
 else
    res.send({success: false, message: "Errore, necessario fornire un id prentoazione valido: " + msg});

}



// --- Annulla Prenotazione
exports.annullaPrenotazione = function(req, res) {
    prenotazioniDAO.richiediDatiPrenotazione(req.body.idPrenotazione, function(datiPrenotazione, msg) {
        if (msg === "OK") {
                                let data1 = datiPrenotazione[0].d_inizio;
                                data1=convertDate(data1);
                                let data2 = new Date();
                                data2=convertDate(data2);
                               
                                 differenza=calcolaDiffDate(data2,data1);

                                console.log("Giorni di differenza");
                                console.log(differenza);

                                prenotazioniDAO.annullaPrenotazione(req.body.idPrenotazione, function(result, msg) {
                                    if (msg === "OK") {
                                        // --- Serie di funzioni finalizzate all'invio delle mail --- //
                                        accountDAO.getUtente(req.body.idUtente, function(datiUtente, msg) {
                                            if (msg === "OK") {
                                                        alloggiDAO.richiestaAlloggio (datiPrenotazione[0].ref_alloggio, function(datiAlloggio, msg) {
                                                            if (msg === "OK") {
                                                                // Invia mail di riepilogo all'utente
                                                                accountDAO.getUtente(datiAlloggio[0].ref_proprietario, function(datiHost, msg){
                                                                    if (msg === "OK") {
                                                                        mailer.inviaMail(datiUtente[0].email, "Conferma annullamento prenotazione",
                                                                        "Ti confermiamo che tua richiesta di prenotazione " +
                                                                        "per la casa '" + datiAlloggio[0].nome_alloggio + "' è stata cancellata con successo.\n"+
                                                                        "Se hai effettuato la richiesta di annullamento almeno 3 giorni prima della data del checkin allora avrai rimborsato l'intera cifra pagata,"+
                                                                        "in caso contrario non avrai diritto al rimborso, come specificato nelle politiche di rimborso\n"+
                                                                        "Per chiarimenti, puoi contattare l'host all'indirizzo e-mail " +
                                                                        datiHost[0].email + ".",
                                                                        function(error, message) {
                                                                            console.log(message);
                                                                        });

                                                                        mailer.inviaMail(datiHost[0].email, "Annullamento prenotazione",
                                                                        "Ti comunichiamo la prenotazione effettuata dall'utente " + datiUtente[0].nome + " " + datiUtente[0].cognome +
                                                                        "per la casa '" + datiAlloggio[0].nome_alloggio + "' è stata annullata dall'utente stesso.\n" +
                                                                        "Ti ricordiamo che se la prenotazione viene annullata almeno 3 giorni prima dalla data del checkin,"+
                                                                        "l'utente ha il diritto al rimborso completo della somma eventualmente pagata"+
                                                                        "Se hai bisogno di contattare l'utente per maggiori informazioni, puoi farlo all'indirizzo mail " +
                                                                        datiUtente[0].email + ".",
                                                                        function(error, message) {
                                                                            console.log(message);
                                                                        });
                                                                    }
                                                                    else {
                                                                    console.log(msg);
                                                                    return false;
                                                                    }
                                                                });
                                                            }
                                                            else {
                                                                console.log(msg);
                                                                return false;
                                                            }
                                                });
                                            }
                                            else {
                                                console.log(msg);
                                                return false;
                                            }
                                        });
                                        // --- fine invio mail --- //
                                        // --- verifica per il rimborso ---// 
                                        
                                        if(differenza>=3)
                                            res.send({success: true, message: "Prenotazione annullata con successo", rimborso: true});
                                        else{
                                            res.send({success: true, message: "Prenotazione annullata con successo", rimborso: false});
                                        }
                                    }
                                    else {
                                        res.send({success: false, message: "Errore nell'annullamento della prenotazione: " + msg});
                                    }
                                });
        }
        else {
            res.send({success: false, message: "Errore nella richiesta dei dati della prenotazione: " +msg});
        }  
    });   
}




// --- Declina Prenotazione:
exports.declinaPrenotazione = function(req, res) {

    prenotazioniDAO.declinaPrenotazione(req.body.idPrenotazione, req.body.motivo, function(result, msg) {
        if (msg === "OK") {
            prenotazioniDAO.richiediDatiPrenotazione(req.body.idPrenotazione, function(datiPrenotazione, msg) {
                if (msg === "OK") {
                    alloggiDAO.richiestaAlloggio(datiPrenotazione[0].ref_alloggio, function(datiAlloggio, msg) {
                        if (msg === "OK") {
                                accountDAO.getUtente(datiPrenotazione[0].ref_utente, function(datiUtente, msg) {
                                    if (msg === "OK") {
                                        accountDAO.getUtente(datiAlloggio[0].ref_proprietario, function(datiHost, msg) {
                                            if(msg==="OK")
                                            {
                                                mailer.inviaMail(datiUtente[0].email, "Prenotazione declinata", 
                                                "Ti comunichiamo che la tua prenotazione per l'alloggio " +
                                                datiAlloggio[0].nome_alloggio + " per il periodo dal " + 
                                                convertDate(datiPrenotazione[0].d_inizio) + " al " + convertDate(datiPrenotazione[0].d_fine) + " è stata rifiutata dall'host " +
                                                "per i seguenti motivi:\n'" + req.body.motivo +
                                                "'\n" +
                                                "Per ulteriori chiarimenti, puoi contattare l'host all'indirizzo e-mail " + datiHost[0].email + "\n", 
                                                function(error, message) {
                                                    console.log(message);
                                                });
                                                res.send({success: true, message: "Prenotazione rifiutata con successo!"});
                                            }
                                            else {
                                                console.log(msg);
                                                res.send({success: true, message: "Prenotazione rifiutata con successo, ma email non inviata!"});
                                               
                                            }
                                    });
                                    }
                                    else {
                                        console.log(msg);
                                        res.send({success: true, message: "Prenotazione rifiutata con successo, ma email non inviata!"});
                                       
                                    }
                                });
                              }
                            else {
                                console.log(msg);
                                res.send({success: true, message: "Prenotazione rifiutata con successo, ma email non inviata!"});
                                
                            }
                            });
                        }
                        else {
                            console.log(msg);
                            res.send({success: true, message: "Prenotazione rifiutata con successo, ma email non inviata!"});
                            
                        }
                    });
                    //res.send({success: true, message: "Prenotazione rifiutata con successo!"});
        }
        else {
        console.log(msg);
        res.send({success: false, message: "Errore nel rifiuto della prenotazione: " + msg});
        }
    });
}