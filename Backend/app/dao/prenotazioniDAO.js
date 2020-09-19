const db = require('../utilities/database');

exports.checkTotGiorni = function(idUtente, idAlloggio, callback) {//viene calcolato quanti giorni ha passato l'utente idUtente all'interno dell'alloggio idAlloggio
    const sql =  `
                    SELECT SUM(DATEDIFF(P.d_inizio, P.d_fine)) as tot_giorni
                    FROM prenotazioni P
                    WHERE P.ref_utente = ?
                        AND P.ref_alloggio = ?
                        AND p.stato='confermata'
                        AND (    YEAR(P.d_inizio) = YEAR(CURDATE()    ) OR   YEAR(P.d_fine) = YEAR(   CURDATE() )    );
                `;
    db.queryRichiesta(sql, [idUtente, idAlloggio], callback);
}


exports.checkDisponibilitaCasa = function(idAlloggio, inizio, fine, callback) {
    const sql = `
                SELECT A.*
                FROM alloggi A, prenotazioni P
                WHERE A.id_alloggio = P.ref_alloggio
                AND A.id_alloggio = ?
                AND P.stato ='confermata'
                AND A.bnb = 0
                AND (
                    ((? <= P.d_inizio AND ? >= P.d_inizio) 
                    OR (? >= P.d_inizio AND ? <= P.d_fine))
                    )
                ;
                `;
    db.queryRichiesta(sql, [idAlloggio, inizio, fine, inizio, inizio], callback);
}

exports.getPrenotazioniAttesa=function(idUtente,callback)
{
    const sql = `
                SELECT P.*, A.nome_alloggio
                FROM prenotazioni P, Alloggi A
                WHERE p.ref_utente=?
                AND P.stato='in attesa'  
                AND p.ref_alloggio=a.id_alloggio
    `;

    db.queryRichiesta(sql, [idUtente], callback);
}


exports.getPrenotazioniAccettateDeclinateConfermate=function(idUtente,callback)
{
    const sql = `
                SELECT P.*, A.nome_alloggio
                FROM prenotazioni P, Alloggi A
                WHERE P.ref_utente=?
                AND (P.stato='accettata' || P.stato='declinata' || P.stato='confermata')
                AND p.ref_alloggio=a.id_alloggio
    `;

    db.queryRichiesta(sql, [idUtente], callback);
}


exports.getPrenotazioniAttesaHost = function(idUtente,callback)
{
    const sql = `
                SELECT P.*, A.nome_alloggio, U.nome as nomeUtente, U.cognome as cognomeUtente
                FROM prenotazioni P, Alloggi A,Utenti U
                WHERE A.ref_proprietario=?
                AND U.id_utente=P.ref_utente
                AND P.stato='in attesa'  
                AND p.ref_alloggio=a.id_alloggio
    `;

    db.queryRichiesta(sql, [idUtente], callback);
}



exports.getPrenotazioniAccettateDeclinateConfermateHost=function(idUtente,callback)
{
    const sql = `
                SELECT P.*, A.nome_alloggio, U.nome as nomeUtente, U.cognome as cognomeUtente
                FROM prenotazioni P, Alloggi A, Utenti U
                WHERE A.ref_proprietario=?
                AND U.id_utente=P.ref_utente
                AND (P.stato='accettata' || P.stato='declinata'|| P.stato='confermata') 
                AND p.ref_alloggio=a.id_alloggio
    `;
    db.queryRichiesta(sql, [idUtente], callback);
}




exports.aggiungiPrenotazioneCasa = function( idAlloggio, idUtente, checkin, checkout, nInteri, nRidotti,
    importo, tasse, interiEsenti, ridottiEsenti, tipo_pagamento, callback) {
    
    let values =[ [ idUtente, idAlloggio, checkin, checkout, nInteri, nRidotti,
        importo, tasse, interiEsenti, ridottiEsenti, tipo_pagamento], ["in attesa"] ];

    var sql = `INSERT INTO prenotazioni
    (ref_utente, ref_alloggio, d_inizio, d_fine, n_adulti, n_ridotti, importo, tasse, n_adulti_esenti, n_ridotti_esenti, tipo_pagamento, d_prenotazione, stato)
    VALUES (?, CURDATE(), ?);
    `

    db.queryInserimento(sql, values, callback);
}


exports.richiediAlloggioById = function(idAlloggio, callback) {
    const sql = `
                SELECT A.*
                FROM alloggi A , utenti U
                WHERE A.id_alloggio = ?
                    AND A.ref_proprietario = u.id_utente
                `;
    db.queryRichiesta(sql, [idAlloggio], callback);
}


exports.richiediDatiPrenotazione = function(idPrenotazione, callback) {
    const sql = `
                SELECT *
                FROM prenotazioni
                WHERE id_prenotazione = ?
                `;
    db.queryRichiesta(sql, [idPrenotazione], callback);
}



exports.annullaPrenotazione = function(id_prenotazione, callback) {
    const sql = "DELETE FROM prenotazioni WHERE id_prenotazione = ?";
    db.queryEliminazione(sql, [id_prenotazione], callback);
}



exports.accettaPrenotazione = function (id_prenotazione, callback) {
    const sql = "UPDATE prenotazioni SET stato='accettata' where id_prenotazione=? ";
    db.queryInserimento(sql, [id_prenotazione], callback);
}

exports.declinaPrenotazione = function(id_prenotazione, rifiuto, callback){
    const sql = `UPDATE prenotazioni SET stato='declinata' where id_prenotazione=?;
    UPDATE prenotazioni SET motivazione_rifiuto = ? where id_prenotazione=?;
        `;
    db.queryInserimento(sql, [id_prenotazione, rifiuto, id_prenotazione], callback);
}

exports.confermaPrenotazione = function (id_prenotazione, callback){
    const sql = "UPDATE prenotazioni SET stato='confermata' where id_prenotazione=?";
    db.queryInserimento(sql, [id_prenotazione], callback);

}


exports.inserisciOspite = function (cf,nome,cognome,d_nascita,d_inizio,d_fine,ind_residenza,ref_prenotazione,callback)
{
    values=[cf,nome,cognome,d_nascita,ind_residenza,d_inizio,d_fine,ref_prenotazione];
    const sql= `INSERT INTO ospiti (cf_ospite, nome, cognome, d_nascita, ind_residenza, d_inizio, d_fine, ref_prenotazione) VALUES (?)`
    db.queryInserimento(sql,[[cf,nome,cognome,d_nascita,ind_residenza,d_inizio,d_fine,ref_prenotazione]],callback);

}


exports.getOspitiPrenotazione=function(idPrenotazione, callback)
{
    const sql= `
        SELECT * from ospiti where ref_prenotazione=?;
    `;
    db.queryRichiesta(sql,[idPrenotazione],callback);
}



//restituisce le stanza disponibili per un particolare alloggio dato in input
exports.getStanzeDisponibili = function(idAlloggio, checkin, checkout, callback) { //OK
    let values = [idAlloggio, checkin, checkout, checkin, checkin];
    const sql = `
    SELECT B.n_singole-SUM(S.singole) as singoleDisp,
    B.n_doppie-SUM(S.doppie) as doppieDisp,
    B.n_triple-SUM(S.triple) as tripleDisp,
    B.n_quadruple-SUM(S.quadruple) as quadrupleDisp
    FROM prenotazioni P, stanzeprenotate S, bnb B
    WHERE B.ref_alloggio = ?
        AND P.ref_alloggio = B.ref_alloggio
        AND P.stato='accettata'
        AND P.id_prenotazione = S.ref_prenotazione
        AND ((? <= P.d_inizio AND ? >= P.d_inizio) 
        OR (? >= P.d_inizio AND ? <= P.d_fine))

        `;

    db.queryRichiesta(sql, values, callback);
}





exports.aggiungiPrenotazioneBnB = function(idAlloggio,idUtente,
    checkin, checkout, nInteri, nRidotti, importo, tasse,
    interiEsenti, ridottiEsenti, tipoPagamento, singole, doppie, triple, quadruple, callback) {
    
    var sql = `
        
    INSERT INTO prenotazioni (ref_utente, ref_alloggio, d_inizio, d_fine, n_adulti, n_ridotti, importo, tasse, n_adulti_esenti, n_ridotti_esenti, tipo_pagamento, stato, d_prenotazione) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,'in attesa', CURDATE() );
    
    SET @ultimaPrenotazione = (
        SELECT MAX(id_prenotazione)
        FROM prenotazioni
        );

    INSERT INTO stanzeprenotate (ref_prenotazione, singole, doppie, triple, quadruple) VALUES (@ultimaPrenotazione, ?,?,?,?);
    `;

    db.queryInserimento(sql, [idUtente, idAlloggio, checkin, checkout, nInteri, nRidotti,
        importo, tasse, interiEsenti, ridottiEsenti, tipoPagamento,singole, doppie, triple, quadruple], callback); 
}


exports.richiediMaxIDPrenotazione = function(callback) {
    const sql = `
        SELECT MAX(id_prenotazione) AS id
        FROM Prenotazione
        `;
    db.queryRichiesta(sql, [], callback);
}