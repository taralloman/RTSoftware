const db = require('../utilities/database');

// --- Inserimento di un utente nel DB:
exports.inserisciUtente = function(email, nome, cognome, password, callback) {
    exports.checkEsistenzaUtente(email, function(registrato) {
        if (registrato) {
            callback(undefined, "Errore: utente già registrato");
        }
        else {
            const sql = "INSERT INTO utenti (email, nome, cognome,  password) VALUES (?);";
            db.queryInserimento(sql, [[email, nome, cognome, password]], callback);
        }
    });
}

// --- Controlla se l'utente è già presente nel DB tramite controllo dell'email
exports.checkEsistenzaUtente = function(email, callback) { //OK
    const sql = "SELECT * FROM utenti WHERE email = ?";
    db.queryConfronto(sql, [email], function (result, msg) {
        if (msg == "OK") {
            callback(true);
        }
        else {
            callback(false);
        }
    });
}

//prende tutti gli utenti dal database
exports.prendiUtenti=function(callback){
    const sql="SELECT * FROM utenti";
    db.queryRichiesta(sql, null, callback);
}

// --- Richiesta di id_utente, email e password per l'autenticazione:
exports.richiediDatiAutenticazione = function(email, callback) { //OK
    exports.checkEsistenzaUtente(email, function(registrato) {
        if (registrato) {
            const sql = "SELECT id_utente, email, password, amministratore FROM utenti U WHERE email = ?";
            db.queryRichiesta(sql, [email], callback);
        }
        else {
            callback(undefined, "Email non presente.");
        }
    });
}


exports.aggiornaPassword = function(email, nuovaPassword, callback) { //OK
    const sql = "UPDATE utenti SET password = ? WHERE email = ?";
    db.queryAggiornamento(sql, [nuovaPassword, email], callback);
}

exports.getUtente = function(idUtente, callback) { //OK
    const sql = "SELECT * FROM utenti WHERE id_utente= ?";
    db.queryRichiesta(sql, [idUtente], callback);
}


// --- Modifica dell'utente //ok
exports.modificaProfiloUtente = function(newEmail, idUtente, nome, cognome, callback) {
    const sql =  "UPDATE utenti SET email = ?, nome = ?, cognome = ? WHERE id_utente = ?";
    db.queryAggiornamento(sql, [newEmail, nome, cognome, idUtente], callback);
} 

// --- Modifica password //OK
exports.modificaPassword = function(id_utente, newPassword, callback) {
    const sql = "UPDATE utenti SET password = ? WHERE id_utente = ?";
    db.queryAggiornamento(sql, [newPassword, id_utente], callback);
}

// --- Elimina account //OK
exports.eliminaUtente = function(id_utente, callback) {
    const sql = "DELETE FROM utenti WHERE id_utente = ?";
    db.queryEliminazione(sql, [id_utente], callback);
}


exports.richiediPrenotazioniEffettuate = function(id_utente, callback){

    const sql = `
         SELECT P.*, A.nome_alloggio
         FROM utenti U, prenotazioni P, alloggi A
         WHERE U.id_utente = P.ref_utente AND U.id_utente=?
         `;
            
    db.queryRichiesta(sql, [id_utente], callback);
}

