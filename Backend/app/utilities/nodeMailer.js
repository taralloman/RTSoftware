//INFO SVILUPPO: Guardare guida online mandata su Telegram


//L'INVIO DELLE EMAIL FUNZIONA CORRETTAMENTE
const nodemailer = require('nodemailer');
const emailRT="rtsoftware2020@gmail.com"

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailRT,
    pass: 'EsameUni2020@'
  }
});

const convertDate = function(date) {
    let d = new Date(date);
    return [d.getDate(), d.getMonth()+1, d.getFullYear()].join('/');
}

exports.inviaMail = function (emailDestinatario, soggetto, testo, callback) {
    var mailOptions = {
        from: emailRT,
        to: emailDestinatario,
        subject: soggetto,
        text: 
        'EMAIL DA READY TRAVEL\n\n' 
        + testo 
    };

    let errore = false;

    transporter.sendMail(mailOptions, function(error, info, callback){
        if (error) {
            errore = true;
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    if (errore == false) {
        callback(undefined, "250 Ok"); 
    }
    else {
        callback(undefined, "Error");
    }
}

