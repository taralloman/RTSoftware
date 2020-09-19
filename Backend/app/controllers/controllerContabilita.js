const contabilitaDAO = require('../dao/contabilitaDAO');
const mailer = require('../utilities/nodeMailer');
//const pdfCreator = require('../utilities/pdfCreator'); // DA UTILIZZARE MAGARI PER STAMPARE IL RENDICONTO
const alloggiDAO = require('../dao/alloggiDAO');
const accountDAO = require('../dao/accountDAO');
const prenotazioniDAO = require('../dao/prenotazioniDAO');
const moment = require('moment'); //libreria di utilità per le date
//const { data } = require('pdfkit/js/reference');





//idAlloggio

exports.visualizzaDatiRendiconto=function(req,res){

    let secondiMese=2592000000;
    alloggiDAO.richiestaAlloggio(req.body.idAlloggio, function(datiAlloggio,msg){
    if (msg=="OK"){
        dataUltimoRendiconto=datiAlloggio[0].data_rendinconto;
        if(dataUltimoRendiconto!=null)
                {

                dataUltimoRendicontoNum=moment(dataUltimoRendiconto).valueOf;
                }
            else{
                dataUltimoRendiconto='1990-01-01';
                dataUltimoRendicontoNum=0;
            }
                dataUltimoRendicontoNum=0;
        dataOggi=new Date();
        dataOggi=dataOggi.getFullYear()+"-"+dataOggi.getMonth()+"-"+dataOggi.getDate();

        dataOggiNum=moment(dataOggi).valueOf;
        if( (dataOggiNum-dataUltimoRendicontoNum)<secondiMese)
            res.send({success: false, message: "Non sono passati 3 mese dall'invio dell'ultimo rendiconto"});
        else{
                contabilitaDAO.getEntrateHost(datiAlloggio[0].ref_proprietario, dataUltimoRendiconto, dataOggi, function(result,msg2){
                
                if(msg2=="OK"){
                    //console.log(datiAlloggio[0]);
                    //CONTROLLI DI INTEGRITA'//
                    /*if(result[].Tasse==null)
                        tasse=0;
                    if (result.Entrate==null)
                        entrate=0;
                    //FINE CONTROLLI DI INTEGRITA'//
                    */

                    contabilitaDAO.getOspitiHost(datiAlloggio[0].ref_proprietario, dataUltimoRendiconto, dataOggi, function(result2,msg3){
                        console.log(datiAlloggio[0].ref_proprietario, dataUltimoRendiconto, dataOggi);
                        if(msg3=="OK"){
                            testo="Rendiconto "+datiAlloggio[0].nome_alloggio+"\n"+"E' stato incassato un totale di € "+tasse+
                            " relativo alla tassazione dall'alloggio "+datiAlloggio[0].nome_alloggio+"\n\n";
                                console.log(result2)
                                for(e in result2){
                                    testo= testo + "Dati dell'ospite:" + e
                                    + "\n Codice fiscale: "+ result2[e].cf_ospite
                                    + "\n Nome: " + result2[e].nome
                                    + "\n Cognome: "+ result2[e].cognome
                                    + "\n Data di nascita: " +  result2[e].d_nascita
                                    + "\n Indirizzo di residenza: " +  result2[e].ind_residenza
                                    + "\n Data inizio permanenza: "+  result2[e].d_inizio 
                                    + "\n Data fine permanenza: "+   result2[e].d_fine+ "\n\n"
                                    }
                                console.log(testo);
                                res.send({success: true, data: testo, message:"Rendiconto effetuato" });

                        }
                        else{
                            res.send({success: false, message: "Errore ricerca ospiti: "+msg3});
                        }
                    
                    
                    });
                }
                else{
                    res.send({success:false, message: "Errore host: "+msg2});
                }



                });

        }
    }
    });



}





/*
req.body.id_proprietario
req.body.d_inizio
req.body.d_fine

*/




exports.getEntrateHost=function(req,res){ //OK

    contabilitaDAO.getEntrateHost(req.body.id_proprietario, req.body.d_inizio, req.body.d_fine,function(result,msg)
    {
        if(result[0].Tasse==null)
            result[0].Tasse=0;
        if (result[0].Entrate==null)
            result[0].Entrate=0;
        console.log(result)
        res.send({success:true, data: result[0]});

    });

}

/*
idAlloggio
*/
var tasse=14;
exports.inviaRendiconto=function(req,res){
    let secondiMese=2592000000;
    alloggiDAO.richiestaAlloggio(req.body.idAlloggio, function(datiAlloggio,msg){
    if (msg=="OK"){
        dataUltimoRendiconto=datiAlloggio[0].data_rendinconto;
        if(dataUltimoRendiconto!=null)
                {

                dataUltimoRendicontoNum=moment(dataUltimoRendiconto).valueOf;
                }
            else{
                dataUltimoRendiconto='1990-01-01';
                dataUltimoRendicontoNum=0;
            }
                dataUltimoRendicontoNum=0;
        dataOggi=new Date();
        dataOggi=dataOggi.getFullYear()+"-"+dataOggi.getMonth()+"-"+dataOggi.getDate();

        dataOggiNum=moment(dataOggi).valueOf;
        if( (dataOggiNum-dataUltimoRendicontoNum)<secondiMese)
            res.send({success: false, message: "Non sono passati 3 mese dall'invio dell'ultimo rendiconto"});
        else{
                contabilitaDAO.getEntrateHost(datiAlloggio[0].ref_proprietario, dataUltimoRendiconto, dataOggi, function(result,msg2){
                
                if(msg2=="OK"){
                    //console.log(datiAlloggio[0]);
                    //CONTROLLI DI INTEGRITA'//
                    /*if(result[].Tasse==null)
                        tasse=0;
                    if (result.Entrate==null)
                        entrate=0;
                    //FINE CONTROLLI DI INTEGRITA'//
                    */

                    contabilitaDAO.getOspitiHost(datiAlloggio[0].ref_proprietario, dataUltimoRendiconto, dataOggi, function(result2,msg3){
                        console.log(datiAlloggio[0].ref_proprietario, dataUltimoRendiconto, dataOggi);
                        if(msg3=="OK"){
                            testo_email="Email rendiconto ufficio turismo della città di "+datiAlloggio[0].ref_comune+"\n"+"E' stato incassato un totale di € "+tasse+
                            " relativo alla tassazione dall'alloggio "+datiAlloggio[0].nome_alloggio+"\n\n";
                                console.log(result2)
                                for(e in result2){
                                    testo_email = testo_email + "Dati dell'ospite:" + e
                                    + "\n Codice fiscale: "+ result2[e].cf_ospite
                                    + "\n Nome: " + result2[e].nome
                                    + "\n Cognome: "+ result2[e].cognome
                                    + "\n Data di nascita: " +  result2[e].d_nascita
                                    + "\n Indirizzo di residenza: " +  result2[e].ind_residenza
                                    + "\n Data inizio permanenza: "+  result2[e].d_inizio 
                                    + "\n Data fine permanenza: "+   result2[e].d_fine+ "\n\n"
                                    }
                                console.log(testo_email);
                                mailer.inviaMail("rtsoftware2020@gmail.com","Rendiconto tasse",testo_email,function(error, message) {
                                    console.log(message);
                                });
                                res.send({success: true, message: "Rendiconto ed invio della email effettuato"});

                        }
                        else{
                            res.send({success: false, message: "Errore ricerca ospiti: "+msg3});
                        }
                    
                    
                    });
                }
                else{
                    res.send({success:false, message: "Errore host: "+msg2});
                }



                });

        }
    }
    });

}




exports.inserisciOspite = function(req, res){ //OK

    prenotazioniDAO.inserisciOspite(req.body.cf,req.body.nome,req.body.cognome,req.body.d_nascita,req.body.d_inizio,
        req.body.d_fine,req.body.ind_residenza,req.body.ref_prenotazione,function(result, msg){
            if (msg=="OK")
                {
                    res.send({result: true, message:"Ospite inserito con successo"});
                }
            else
                {
                    res.send({result: false, message: msg});
                }

        });

}

exports.getOspitiPrenotazione=function(req,res) //ok
{
    prenotazioniDAO.getOspitiPrenotazione(req.body.idPrenotazione,function(result,msg)
    {
        res.send({success: true, data: result, message:"Ospiti prenotazione n: "+req.body.idPrenotazione});
    });
}



/*
idPrenotazione
idAlloggio

*/

exports.sendDatiOspiti = function(req, res) {
   

    prenotazioniDAO.getOspitiPrenotazione(req.body.idPrenotazione, function(result,msg ){
       if(msg=="OK"){
           console.log(req.body.idAlloggio)
        alloggiDAO.richiestaAlloggio(req.body.idAlloggio, function(result2,msg2)
        {
            if(msg2=="OK")
            {  
             var testo_email = "\nELENCO OSPITI STRUTTURA PER LA PRENOTAZIONE "+req.body.idPrenotazione+" DELLA STRUTTURA "+result2[0].nome_alloggio+ "\n\n";
              for(e in result){

                  testo_email = testo_email + "Dati dell'ospite:" + e
                  + "\n Codice fiscale: "+ result[e].cf_ospite
                  + "\n Nome: " + result[e].nome
                  + "\n Cognome: "+ result[e].cognome
                  + "\n Data di nascita: " +  result[e].d_nascita
                  + "\n Indirizzo di residenza: " +  result[e].ind_residenza + "\n\n"
                }
            console.log(testo_email);

            mailer.inviaMail("gioberni1998@gmail.com", "DATI OSPITI STRUTTURA ",
            testo_email, function(error, message) {
                console.log(message);
            });
            prenotazioniDAO.confermaPrenotazione(req.body.idPrenotazione, function(resul3,msg3){
                if (msg3=="OK")
                    res.send({result: true, message: "I dati relativi alla prenotazione "+req.body.idPrenotazione+" sono stati inviati" });
                else{
                    res.send({result: false, message: "Problema nella conferma" });
                }
            });

            
            }
            else{
                res.send({result: false, message: "Errore: alloggio non trovato: "+msg2});
            }
        });
    
      }
      else{
          res.send({result:false, message:"Errore: prenotazione non trovata: "+msg});
      }
  });
}


// --- Mostra Contabilita
exports.datiContabilita = function(req, res) {

    contabilitaDAO.mostraContabilita(req.body.idUtente, req.body.anno, function(guadagniMensili, msg1) {
        if (msg1 === "OK" || msg1 === "NO_RESULT") {
            contabilitaDAO.calcolaEntrateHost(sess.idUtente, function(entrateTotali, msg2) {
                if (msg2 === "OK" || msg2 === "NO_RESULT") {
                    contabilitaDAO.calcolaUsciteHost(sess.idUtente, function(usciteTotali, msg3) {
                        if (msg3 === "OK" || msg3 === "NO_RESULT") {
                            contabilitaDAO.calcolaTotaleOspitiHost(sess.idUtente, function(totaleOspiti, msg4) {
                                if (msg4 === "OK" || msg4 === "NO_RESULT") {
                                    let entrateTot = [];
                                    let usciteTot = [];
                                    let totaleOsp = [];
                                    let listaGuadagniMensili = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

                                    if (msgA === "OK") {
                                        guadagniMensili[1].forEach(function(item) {
                                            listaGuadagniMensili[item.Mese - 1] = item.GuadagnoMensile;
                                        });
                                    }
                                    if (msgB === "OK") {
                                        entrateTot = entrateTotali[0].entrate;
                                    }
                                    if (msgA === "OK") {
                                        usciteTot = usciteTotali[0].uscite;
                                    }
                                    if (msgA === "OK") {
                                        totaleOsp = totaleOspiti[0].numOspiti;
                                    }
                                    
                                    res.send({
                                        success: true, 
                                        message: "Trovati dati contabilità!", 
                                        guadagniMensili: listaGuadagniMensili,
                                        entrateTotali: entrateTot,
                                        usciteTotali: usciteTot,
                                        totaleOspiti: totaleOsp
                                    });
                                }
                                else {
                                    res.send({success: false, message: "Errore nella richiesta del totale ospiti dell'host: " +  msgD});
                                }
                            });
                        }
                        else {
                            res.send({success: false, message: "Errore nella richiesta delle uscite dell'host: " +  msgC});
                        }
                    });
                }
                else {
                    res.send({success: false, message: "Errore nella richiesta delle entrate dell'host: " + msgB});
                }
            }); 
            
        }   
        else {
            res.send({success: false, message: "Errore nella richiesta dei guadagni mensili: " + msgA});
        }
    });
}

// --- Avviso Rendiconto Trimestrale
exports.avvisoRendicontoTrimestrale = function() {
    contabilitaDAO.trovaHostDaAvvisare(function(mailList, msg) {
        if (msg === "OK") {
            mailer.inviaAvvisoRendiconto(mailList, function(error, msg) {
                if (msg === "250 Ok") {
                    mailList.forEach(function(item) {
                        contabilitaDAO.applicaRestrizioni(item.ID_Utente, function(result, msg) {
                            if (msg === "OK") {
                                console.log("Restrizioni applicate all'host con ID" + item.ID_Utente + ".");
                            }
                            else {
                                console.log("Impossibile applicare restrizioni all'host con ID" + item.ID_Utente + ": " + msg);
                            }
                        });
                    });
                }
                else {
                    console.log("Si è verificato un errore nell'invio degli avvisi per il rendiconto.");
                }
            });
        }
        else {
            console.log("Non sono stati trovati host a cui inviare un avviso.");
        }
    });
}