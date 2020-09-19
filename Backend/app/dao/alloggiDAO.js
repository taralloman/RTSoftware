const db = require('../utilities/database');


exports.cancellaAlloggio = function (id_alloggio, callback) {
    const sql = "DELETE FROM alloggi WHERE id_alloggio = ?";
    db.queryEliminazione(sql, [id_alloggio], callback);
} 


exports.inserisciCasa = function(nomeAlloggio, refProp, descrizione, tassaIntera, tassaRidotta, refComune,
    indirizzo, bnb, tipoPagamento, prezzo, nBagni, postiLetto, foto, callback) {

    let values = [
        [nomeAlloggio, refProp, descrizione, tassaIntera, tassaRidotta, refComune,
            indirizzo, bnb, tipoPagamento, foto],
        [prezzo, nBagni, postiLetto]
    ];

    const sql = `
        INSERT INTO alloggi (nome_alloggio, ref_proprietario, descrizione, tassa_intera, tassa_ridotta, ref_comune, indirizzo, bnb, tipo_pagamento, foto, d_inserimento)
        VALUES (?, CURDATE());
        
        SET @maxID = (SELECT MAX(id_alloggio)
            FROM alloggi
        );

        INSERT INTO casa (ref_alloggio,prezzo,n_bagni,posti_letto) VALUES (
            @maxID, ?);

        `;

    db.queryInserimento(sql, values, callback);
}



exports.inserisciBnB = function( nomeAlloggio, refProp, descrizione, tassaIntera, tassaRidotta, refComune,
    indirizzo, bnb, tipoPagamento, numeroSingole, numeroDoppie, numeroTriple, numeroQuadruple, prezzoSingole,
    prezzoDoppie, prezzoTriple, prezzoQuadruple, foto, callback) {

    let values = [
        [nomeAlloggio, refProp, descrizione, tassaIntera, tassaRidotta, refComune,
            indirizzo, bnb, tipoPagamento, foto],
        [ numeroSingole, numeroDoppie, numeroTriple, numeroQuadruple, 
           prezzoSingole, prezzoDoppie, prezzoTriple, prezzoQuadruple
        ]
    ];
    
    const sql = `
    INSERT INTO alloggi (nome_alloggio, ref_proprietario, descrizione, tassa_intera, tassa_ridotta, ref_comune, indirizzo, bnb, tipo_pagamento, foto, d_inserimento)
    VALUES (?, CURDATE() ) ;
    
    SET @maxID = (SELECT MAX(id_alloggio)
        FROM alloggi
    );

    INSERT INTO bnb (ref_alloggio, n_singole, n_doppie, n_triple, n_quadruple, prezzo_singola, prezzo_doppia, prezzo_tripla, prezzo_quadrupla) VALUES (
            @maxID, ?);
    
    `;


    db.queryInserimento(sql, values, callback);
}

//by idUtente
exports.richiediAlloggiHost = function(idUtente, callback) {
    const sql = `
                SELECT *
                FROM alloggi A
                WHERE A.ref_proprietario = ?
                `;
    db.queryRichiesta(sql, [idUtente], callback);
}

// by idAlloggio
exports.richiestaAlloggio = function(idAlloggio, callback) {
    const sql = "SELECT A.*,R.nome_regione, U.email FROM alloggi A, regioni R, Comuni c, Utenti U WHERE A.id_alloggio = ? AND R.nome_regione=C.ref_regione AND A.ref_comune=C.nome_comune AND A.ref_proprietario=U.id_utente";
    
    db.queryRichiesta(sql, [idAlloggio], callback);
}



exports.richiestaDatiBnB = function(idAlloggio, callback) {
    const sql = "SELECT * FROM bnb WHERE ref_alloggio = ?";

    db.queryRichiesta(sql, [idAlloggio], callback);
}

exports.richiestaDatiCasa = function(idAlloggio, callback) {
    const sql = "SELECT * FROM casa WHERE ref_alloggio = ?";

    db.queryRichiesta(sql, [idAlloggio], callback);
}




exports.modificaCasa = function( idAlloggio, nomeAlloggio, refProp, descrizione, tassaIntera, tassaRidotta, refComune,
indirizzo, bnb, tipoPagamento, prezzo, nBagni, postiLetto, callback){
    

    let values = [
        nomeAlloggio, refProp, descrizione, tassaIntera, tassaRidotta, refComune,
        indirizzo, bnb, tipoPagamento,idAlloggio, prezzo, nBagni, postiLetto,
        idAlloggio
    ];


        
    const sql = `
    UPDATE alloggi
    SET nome_alloggio=?,
    ref_proprietario=?,
     descrizione=?,
     tassa_intera=?,
     tassa_ridotta=?,
     ref_comune=?,
     indirizzo=?,
     bnb=?,
     tipo_pagamento=?
    WHERE id_alloggio = ?;

    UPDATE casa
    SET prezzo=?,
    n_bagni=?,
    posti_letto=?
    WHERE ref_alloggio=?;

    `;

    db.queryAggiornamento(sql, values, callback);
} 

exports.modificaBnB = function( idAlloggio, nomeAlloggio, refProp, descrizione, tassaIntera, tassaRidotta, refComune,
    indirizzo, bnb, tipoPagamento, numeroSingole, numeroDoppie, numeroTriple, numeroQuadruple, prezzoSingola,
    prezzoDoppia, prezzoTripla, prezzoQuadrupla, callback) {


    let values = [nomeAlloggio, refProp, descrizione, tassaIntera, tassaRidotta, refComune,
        indirizzo, bnb, tipoPagamento, idAlloggio,

        numeroSingole, numeroDoppie, numeroTriple, numeroQuadruple,
        prezzoSingola, prezzoDoppia, prezzoTripla, prezzoQuadrupla, idAlloggio,
        ];
    const sql = `
    UPDATE alloggi
    SET nome_alloggio=?,
    ref_proprietario=?,
     descrizione=?,
     tassa_intera=?,
     tassa_ridotta=?,
     ref_comune=?,
     indirizzo=?,
     bnb=?,
     tipo_pagamento=?
    WHERE id_alloggio = ?;

    UPDATE bnb 
    SET n_Singole = ?, 
        n_Doppie = ?,
        n_Triple = ?, 
        n_Quadruple = ?,
        prezzo_singola = ?,
        prezzo_doppia = ?,
        prezzo_tripla = ?,
        prezzo_quadrupla = ?
    WHERE ref_alloggio = ?;

    `;

    db.queryAggiornamento(sql, values, callback);
}


exports.trovaComune = function(nomeComune, callback) {
    const sql = 'SELECT nome_comune FROM Comuni WHERE nome_comune = ?';

    db.queryRichiesta(sql, [nomeComune], callback);
}


