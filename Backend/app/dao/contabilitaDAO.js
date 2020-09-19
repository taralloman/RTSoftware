const db = require('../utilities/database');


exports.getEntrateHost = function(idHost, d_inizio, d_fine, callback) {
    const sql = `

        SELECT SUM(P.importo) as Entrate, SUM(P.tasse) as Tasse
        FROM Prenotazioni P, Alloggi A
        WHERE P.stato='confermata'
            AND P.ref_alloggio = A.id_alloggio
            AND A.ref_proprietario = ? 
            AND P.d_inizio>=? AND P.d_fine < ?;
    `;
    
    db.queryRichiestaSpeciale3(sql, idHost, d_inizio, d_fine, callback);
}

exports.getOspitiHost = function(idHost, d_inizio, d_fine, callback)
{

    const sql = `
        SELECT O.*,P.d_inizio,P.d_fine
        FROM Prenotazioni P, Alloggi A, Ospiti O
        WHERE P.stato='confermata'
            AND P.ref_alloggio = A.id_alloggio
            AND O.ref_prenotazione = P.id_prenotazione
            AND A.ref_proprietario = ?
            AND P.d_inizio>= '1990-01-01' AND P.d_fine <='2090-01-01';
    `;
    
    db.queryRichiesta(sql, [idHost,d_inizio, d_fine], callback);
}
/*
    SELECT O.*, P.d_inizio, P.d_fine
    FROM Prenotazioni P, Alloggi A, Ospiti O
    WHERE P.stato='confermata'
        AND P.ref_alloggio = A.id_alloggio
        AND O.ref_prenotazione=P.id_prenotazione
        AND A.ref_proprietario = 16
        AND P.d_inizio>='1990-01-01' AND P.d_fine <='2090-01-01';
*/



exports.getTotaleOspitiHost = function(idHost, callback) {
    const sql = `
        SELECT COUNT(*) AS numero_ospiti
        FROM Ospiti O,Prenotazione P, Alloggi A
        WHERE O.ref_prenotazione = P.id_prenotazione
            AND P.stato='confermata'
            AND P.ref_alloggio = A.id_alloggio
            AND A.ref_proprietario = ?;
    `;
    
    db.queryRichiesta(sql, [idHost], callback);
}