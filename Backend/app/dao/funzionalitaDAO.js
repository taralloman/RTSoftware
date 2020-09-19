const db = require('../utilities/database');


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
