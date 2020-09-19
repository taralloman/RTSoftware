var alloggiDAO = require('../dao/alloggiDAO');
var controllerAccount = require('./controllerAccount');
var Joi = require('@hapi/joi');
var fileHandler = require('../utilities/fileHandler');
var mailer = require('../utilities/nodeMailer');

// --- Funzionalità per la gestione di immobili di un host

exports.getStanzeDisponibili=function(req,res){

    prenotazioniDAO.getStanzeDisponibili(req.body.idAlloggio, req.body.checkin, req.body.checkout, function(result,msg){
        if (msg=="OK")
            {
                res.send({success:true, data: result, message: "Stanze trovate"});
            }
        else{
            res.send({success: false, data: undefined, message: "Errore" });
        }
    })


}

// --- Richiedi tutti gli immobili dell'host:
exports.richiediAlloggiHost = function(req, res) { //Ok funziona, anche con le immagini
    if (req.body.idUtente) {
        alloggiDAO.richiediAlloggiHost(req.body.idUtente, function(result, msg) {
            if (msg === "OK") {
                result.forEach(function(item) {
                    let percorsoFoto = '';
                    if (item.foto === fileHandler.defaultAlloggio || item.foto == null) {
                        percorsoFoto = fileHandler.percorsoDefaults + fileHandler.defaultAlloggio;
                    }
                    else {
                        percorsoFoto = fileHandler.percorsoAlloggi + item.foto;
                    }
                    item["percorsoFoto"] = percorsoFoto;
                });
                res.send({success: true, data2: result, message: "Immobili trovati"});
            }
            else if (msg === "NO_RESULT") {
                res.send({success: true, data: null, message: "Non ci sono immobili a nome di questo utente."});
            }
        });
    }
    else {
        res.send({success: false, message: "Errore: l'utente non è autenticato."});
    }
}

exports.inserisciAlloggio = function(req,res){ 

    /**parte verifica del file immagine*/
    console.log(req.file.filename);
    if (req.file) {
        fileHandler.checkEstensioneFile(req.file.originalname, [".png", ".jpg", ".jpeg"], function(corretti) {
            if (corretti){
   
                    if (req.body.bnb==0) //casa vacanze
                    {
                        controllerAccount.checkLogged(req, function(r,msg) {
                            console.log(req.body); 
                            console.log(msg); 
                            if (msg === "OK") {
                                const schema = Joi.object({
                                    nomeAlloggio: Joi.string().min(1).max(255).required(),
                                    idUtente: Joi.required(),
                                    descrizione: Joi.string().min(1).max(1500).required(),
                                    tassaIntera: Joi.required(),
                                    tassaRidotta: Joi.required(),
                                    refComune: Joi.required(),
                                    indirizzo: Joi.string().min(3).max(255).required(),
                                    bnb: Joi.required(),
                                    tipoPagamento: Joi.string().valid('contanti', 'online','entrambi'),
                                    prezzo: Joi.required(),
                                    nBagni: Joi.required(),
                                    postiLetto: Joi.required()
                                    });
                                    
                                const check = schema.validate({
                                    nomeAlloggio: req.body.nomeAlloggio,
                                    idUtente: req.body.idUtente,
                                    descrizione: req.body.descrizione,
                                    tassaIntera: req.body.tassaIntera,
                                    tassaRidotta: req.body.tassaRidotta,
                                    refComune: req.body.refComune,
                                    indirizzo: req.body.indirizzo,
                                    bnb: req.body.bnb,
                                    tipoPagamento: req.body.tipoPagamento,
                                    prezzo: req.body.prezzo,
                                    nBagni: req.body.nBagni,
                                    postiLetto: req.body.postiLetto
                                });
                                
                                if (check.error === undefined) {
                                    alloggiDAO.trovaComune(req.body.refComune, function(comuneResult, msg) {
                                        if (msg === "OK") {
                                            alloggiDAO.inserisciCasa(req.body.nomeAlloggio, req.body.idUtente, req.body.descrizione,
                                                req.body.tassaIntera, req.body.tassaRidotta, req.body.refComune, req.body.indirizzo, req.body.bnb, req.body.tipoPagamento,
                                                req.body.prezzo, req.body.nBagni, req.body.postiLetto, req.file.filename, function(result, msg) {
                                                    if (msg === "OK") {
                                                        res.send({success: true, message: "Casa aggiunta con successo!"});
                                                    }
                                                    else {
                                                        fileHandler.eliminaImmagineAlloggio(req.file.filename, function(msg) {
                                                            console.log(msg);
                                                        });
                                                        res.send({success: false, message: "Errore nell'inserimento della casa: " + msg});
                                                    }
                                            });
                                        }
                                        else if (msg === "NO_RESULT") { // In caso di errore, il file inserito deve essere rimosso, si ripete nel presentarsi di un qualsiasi dei suvcessivi casi di errore
                                            fileHandler.eliminaImmagineAlloggio(req.file.filename, function(msg) {
                                                console.log(msg);
                                            });
                                            res.send({success: false, message: "Comune non valido"});
                                        }
                                        else {
                                            fileHandler.eliminaImmagineAlloggio(req.file.filename, function(msg) {
                                                console.log(msg);
                                            });
                                            res.send({success: false, message: "Errore valutazione comune: " + msg});
                                        } 
                                    });
                                }
                                else {
                                    
                                    res.send({success: false, message: "Errore nella validazione dei dati: " + msg});
                                }
                            }
                            else {
                                fileHandler.eliminaImmagineAlloggio(req.file.filename, function(msg) {
                                    console.log(msg);
                                });
                                res.send({success: false, message: "L'utente non è loggato"});
                            }
                        });
                    }
            else{   //bnb
                                
                                controllerAccount.checkLogged(req, function(r,msg) {
                                console.log(req.body);
                                if (msg === "OK"){
                                    const schema = Joi.object({
                                        nomeAlloggio: Joi.string().min(1).max(255).required(),
                                        idUtente: Joi.required(),
                                        descrizione: Joi.string().min(1).max(1500).required(),
                                        tassaIntera: Joi.required(),
                                        tassaRidotta: Joi.required(),
                                        refComune: Joi.required(),
                                        indirizzo: Joi.string().min(3).max(255).required(),
                                        bnb: Joi.required(),
                                        tipoPagamento: Joi.string().valid('contanti', 'online','entrambi').required(),
                                        nSingole: Joi.required(),
                                        nDoppie: Joi.required(),
                                        nTriple: Joi.required(),
                                        nQuadruple: Joi.required(),
                                        prezzoSingola: Joi.required(),
                                        prezzoDoppia: Joi.required(),
                                        prezzoTripla: Joi.required(),
                                        prezzoQuadrupla: Joi.required()
                                        });
                                
                                    const check = schema.validate({
                                        nomeAlloggio: req.body.nomeAlloggio,
                                        idUtente: req.body.idUtente,
                                        descrizione: req.body.descrizione,
                                        tassaIntera: req.body.tassaIntera,
                                        tassaRidotta: req.body.tassaRidotta,
                                        refComune: req.body.refComune,
                                        indirizzo: req.body.indirizzo,
                                        bnb: req.body.bnb,
                                        tipoPagamento: req.body.tipoPagamento,
                                        nSingole: req.body.nSingole,
                                        nDoppie: req.body.nDoppie,
                                        nTriple: req.body.nTriple,
                                        nQuadruple: req.body.nQuadruple,
                                        prezzoSingola: req.body.prezzoSingola,
                                        prezzoDoppia: req.body.prezzoDoppia,
                                        prezzoTripla: req.body.prezzoTripla,
                                        prezzoQuadrupla: req.body.prezzoQuadrupla                         
                                    });
                                
                                    if (check.error === undefined) {
                                        alloggiDAO.trovaComune(req.body.refComune, function(comuneResult, msg) {
                                            if (msg === "OK") {
                                                alloggiDAO.inserisciBnB(req.body.nomeAlloggio, req.body.idUtente, req.body.descrizione,
                                                    req.body.tassaIntera, req.body.tassaRidotta, req.body.refComune, req.body.indirizzo, req.body.bnb, req.body.tipoPagamento,
                                                    req.body.nSingole, req.body.nDoppie, req.body.nTriple, req.body.nQuadruple, req.body.prezzoSingola, 
                                                    req.body.prezzoDoppia, req.body.prezzoTripla, req.body.prezzoQuadrupla, req.file.filename, function(result, msg) {
                                                        if (msg === "OK") {
                                                            res.send({success: true, message: "Bnb aggiunto con successo!"});
                                                        }
                                                        else {
                                                            fileHandler.eliminaImmagineAlloggio(req.file.filename, function(msg) {
                                                                console.log(msg);
                                                            });
                                                            res.send({success: false, message: "Errore nell'inserimento del bnb: " + msg});
                                                        }
                                                });
                                            }
                                            else if (msg === "NO_RESULT") { // In caso di errore, il file inserito deve essere rimosso, si ripete nel presentarsi di un qualsiasi dei suvcessivi casi di errore
                                                        {fileHandler.eliminaImmagineAlloggio(req.file.filename, function(msg) {
                                                            console.log(msg);
                                                        });
                                                        res.send({success: false, message: "Comune non valido"});
                                                        }
                                                    }
                                            else {
                                                fileHandler.eliminaImmagineAlloggio(req.file.filename, function(msg) {
                                                    console.log(msg);
                                                });
                                                res.send({success: false, message: "Errore valutazione comune: " + msg});
                                            } 
                                        });
                                    }
                                    else {
                                        
                                        res.send({success: false, message: "Errore nella validazione dei dati: " + msg});
                                    }
                                }
                                else {
                                    fileHandler.eliminaImmagineAlloggio(req.file.filename, function(msg) {
                                        console.log(msg);
                                    });
                                    res.send({success: false, message: "L'utente non è loggato"});
                                }
                            });
                }
             }
            else {
                res.send({success: false, message: "File non inserito"});
            }
        });
    }
}


/*
è una get
req.query:
idAlloggio
*/

// --- Visualizza Alloggio
exports.visualizzaAlloggio = function(req, res) { //OK
    console.log(req.body.idAlloggio);
    alloggiDAO.richiestaAlloggio(req.body.idAlloggio, function(datiAlloggio, msg) {
        
        if (msg === "OK") { // se l'alloggio viene trovato
            
                    //gestione foto
                    let percorsoFoto = '';
                    if (datiAlloggio[0].foto === fileHandler.defaultAlloggio || datiAlloggio[0].foto == null) {
                        percorsoFoto = fileHandler.percorsoDefaults + fileHandler.defaultAlloggio;
                    }
                    else {
                        percorsoFoto = fileHandler.percorsoAlloggi + datiAlloggio[0].foto;
                    }
                    datiAlloggio[0]["foto"] = percorsoFoto;
                    //fine gestione foto

                    if (datiAlloggio[0].bnb == 0) { //Se è una casa
                        alloggiDAO.richiestaDatiCasa(req.body.idAlloggio, function(datiCasa, msg) {
                            if (msg === "OK") {
                                if (datiAlloggio[0].tipo_pagamento == "entrambi")
                                    datiAlloggio[0].tipo_pagamento = " Online o contanti"
                                res.send({
                                    success: true, 
                                    message: "Casa trovata", 
                                    datiAlloggio: JSON.stringify(datiAlloggio[0]), 
                                    datiCasa: JSON.stringify(datiCasa[0]),
                                    percorsoFoto: percorsoFoto 
                                    
                                });
                                console.log(JSON.stringify(datiAlloggio[0]), JSON.stringify(datiCasa[0]));
                                
                            }
                            else {
                                res.send({success: false, message: "Errore nella richiesta dei dati della casa: " + msg});
                            }
                        });
                    }
                    else {  //se è un bnb
                        alloggiDAO.richiestaDatiBnB(req.body.idAlloggio, function(datiBnB, msg) {
                            if (msg === "OK") {
                                if (datiAlloggio[0].tipo_pagamento == "entrambi")
                                    datiAlloggio[0].tipo_pagamento = " Online o contanti"
                                res.send({
                                    success: true, 
                                    message: "BnB trovato", 
                                    datiAlloggio: JSON.stringify(datiAlloggio[0]), 
                                    datiBnB: JSON.stringify(datiBnB[0]),                                    
                                    percorsoFoto: percorsoFoto
                                });
                                console.log(JSON.stringify(datiAlloggio[0]), JSON.stringify(datiBnB[0]));
                            }
                            else {
                                res.send({success: false, message: "Errore nella richiesta dei dati del B&B: " + msg});
                            }
                        });
                    }
                }
        else if (msg === "NO_RESULT") {
            res.send({success: false, message: "Errore: alloggio non presente"});
        }
        else {
            res.send({success: false, message: "Errore nella richiesta dei dati dell'alloggio: " + msg});
        }
    });
}


/*

req.body:
idAlloggio
*/

// --- Cancella Alloggio 
exports.cancellaAlloggio = function(req, res) { //OK    
    
    alloggiDAO.richiestaAlloggio(req.body.idAlloggio, function(dati, msg) {
        if (msg === "OK") {
            console.log(dati);
            alloggiDAO.cancellaAlloggio(req.body.idAlloggio, function(result, msg) {
            if (msg === "OK") {
                fileHandler.eliminaImmagineAlloggio(dati[0].foto, function(msg) {
                    console.log(msg);
                });
                res.send({success: true, message: "Immobile eliminato con successo."});
            }
            else {
                res.send({success: false, message: "Errore nell'eliminazione dell'immobile: " + msg});
            }
            });                        
        }
        else if (msg === "NO_RESULT") {
            res.send({success: false, message: "Errore: immobile non trovato."});
        }
        else {
            res.send({success: false, message: "Errore nella richiesta dei dati dell'immobile: " + msg});
        }
    });
}


exports.modificaAlloggio=function(req,res){
console.log(req.body)
if(req.body.bnb==0){ //se è casa
    controllerAccount.checkLogged(req, function(r1,msg) {
        console.log(msg)
        if (msg == "OK") {
            alloggiDAO.richiestaAlloggio(req.body.idAlloggio, function(datiAlloggio, msg2) {
                if (msg2 == "OK") {
                    //let fotoDaInserire = datiAlloggio[0].foto;
                    
                    alloggiDAO.modificaCasa(req.body.idAlloggio, req.body.nomeAlloggio, req.body.idUtente, req.body.descrizione,
                        req.body.tassaIntera, req.body.tassaRidotta, req.body.refComune, req.body.indirizzo, req.body.bnb, req.body.tipoPagamento,
                        req.body.prezzo, req.body.nBagni, req.body.postiLetto, function(result, msg3) {
                            if (msg3 === "OK") {
                                res.send({success: true, message: "Casa modificata con successo!"});
                            }
                            else {
                                res.send({success: false, message: "Errore nell'inserimento della casa: " + msg3});
                            }
                    });
                }
                else if (msg2 == "NO_RESULT") {
                    res.send({success: false, message: "Errore: alloggio non presente nel database"});
                }
                else {
                    res.send({success: false, message: "Errore nella ricerca dei dati dell'alloggio: " + msg2});
                }
            });
        }
        else if (msg == "NO_RESULT") {
            res.send({success: false, message: "L'utente deve prima effettuare l'accesso "});
        }
        else {
            res.send({success: false, message: "Errore nella ricerca dei dati dell'utente: " + msg});
        } 
    });

}
else if(req.body.bnb==1){ // se è bnb
            controllerAccount.checkLogged(req, function(r1, msg) { 
                if (msg == "OK") {
                    //sess = JSON.parse(req.body.sessionData);
                    alloggiDAO.richiestaAlloggio(req.body.idAlloggio, function(datiAlloggio, msg2) {
                        if (msg2 == "OK") {
                            //let fotoDaInserire = datiImmobile[0].foto;
                            
                            alloggiDAO.modificaBnB(req.body.idAlloggio, req.body.nomeAlloggio, req.body.idUtente, req.body.descrizione,
                                req.body.tassaIntera, req.body.tassaRidotta, req.body.refComune, req.body.indirizzo, req.body.bnb, req.body.tipoPagamento,
                                req.body.nSingole,req.body.nDoppie,req.body.nTriple,req.body.nQuadruple,req.body.prezzoSingola,req.body.prezzoDoppia,
                                req.body.prezzoTripla, req.body.prezzoQuadrupla, function(result, msg3) {
                                    if (msg3 === "OK") {
                                        res.send({success: true, message: "BnB modificato con successo!"});
                                    }
                                    else {
                                        res.send({success: false, message: "Errore nell'inserimento dell'immobile: " + msg3});
                                    }
                            });
                        }
                        else if (msg2 == "NO_RESULT"){
                            res.send({success: false, message: "Errore: immobile non esistente"});
                        }
                        else {
                            res.send({success: false, message: "Errore nella ricerca dei dati dell'immobile: " + msg2});
                        }
                    });
                }
                else if (msg == "NO_RESULT") {
                    res.send({success: false, message: "Utente non trovato"});
                }
                else {
                    res.send({success: false, message: "Utente non trovato" + msg});
                } 
            });

        }
    else{
        res.send({success: false, message: "Errore, specificare se si deve modificare un bnb o una casa vacanze"});
    }



}
