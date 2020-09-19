const { callbackPromise } = require("nodemailer/lib/shared");

var sessioni = [];
var sessioniAdmin = [];

// --- Per utenti normali:
/*
    {
        "idUtente"
        "email"
        EVENTUALI ALTRI CAMPI
    }
*/

const rimuoviSessione_Timer = function(data) {
    if (exports.esisteSessione(data)) {
        exports.cancellaSessione(data);
    }
}

exports.aggiungiSessione = function(data) {
    sessioni.push(data);
    setTimeout(rimuoviSessione_Timer, 3 * 60 * 60 * 1000, data);
}

exports.cancellaSessione = function(data) {
    for (let i = 0; i < sessioni.length; i++) {
        if (sessioni[i].idUtente == data.idUtente) {
            sessioni.splice(i, 1); //Eliminazione della sessione
        }
    }
}

exports.esisteSessione = function(data) {
    for (let i = 0; i < sessioni.length; i++) {
        if (sessioni[i].idUtente == data.idUtente) {
            return true;
        }
    }
    return false;
} 




/*ADMIN: NECESSITANO SOLO DI AVER PASSATO UN ID

{
    "idUtente":id

}
*/

const rimuoviSessioneAdmin_Timer = function(data) {
    if (exports.esisteSessioneAdmin(data)) {
        exports.cancellaSessioneAdmin(data);
    }
}

exports.aggiungiSessioneAdmin = function(data) {
    sessioniAdmin.push(data);
    setTimeout(rimuoviSessioneAdmin_Timer, 3 * 60 * 60 * 1000, data);
}


exports.cancellaSessioneAdmin = function(data) {
    for (let i = 0; i < sessioniAdmin.length; i++) {
        if (sessioniAdmin[i].idUtente == data.idUtente) {
            sessioniAdmin.splice(i, 1);
        }
    }
}

exports.esisteSessioneAdmin = function(data) {
    for (let i = 0; i < sessioniAdmin.length; i++) {
        if (sessioniAdmin[i].idUtente == data.idUtente) {
            return true;
        }
    }
    return false;
} 