var mysql = require('mysql');



//Effettuando la suddivisione di ogni tipologia di query in connessione/query/chiusura si reiscono ad affettuare 
//singole query senza mantenere una connessione attiva a lungo termine

//La suddivisione delle query in inserimento/richiesta... è utile anche in fase di debug


/*
    QUERY INSERIMENTO DATI

    Successo: ritorna i risultati e un messaggio "OK"
    Fallimento: ritorna un oggetto "undefined" e il messaggio di errore
*/
exports.queryInserimento = function insertQuery(sql, queryParams, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'pass',
        database: 'rtsoftware',
        multipleStatements: true,
        port: 3306
    });
    
    connection.connect(function(error) {
        if(!!error){
            console.log('Errore: impossibile connettersi al database');
            callback(undefined, error);
            return;
        } else {
            console.log('Connesso al database');
        }
    });

    connection.query(sql, queryParams, function(err, result, fields) {
        if (err) {
            console.log(err);
            callback(undefined, err);
        }
        else {
            callback(result, "OK");
        }
    });

    connection.end(function(err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
}

/*
    QUERY PER RICHIESTE
    Successo: ritorna i risultati e un messaggio "OK";
    Fallimento: ritorna un oggetto "undefined" e il messaggio di errore.
*/
exports.queryRichiesta = function requestQuery(sql, queryParams, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'pass',
        database: 'rtsoftware',
        multipleStatements: true,
        port: 3306
    });
    
    connection.connect(function(error) {
        if(!!error){
            console.log('Errore: impossibile connettersi al database');
            callback(undefined, error);
            return;
        } else {
            console.log('QueryRichiesta: Connesso al database');
        }
    });
    connection.query(sql, queryParams, function(err, result) {
        if (err) {
            console.log(err);
            callback(undefined, err);
        }
        else {
            console.log(JSON.stringify(result))
            callback(result, (result.length > 0) ? "OK" : "NO_RESULT");
            
        }
    });

    connection.end(function(err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Chiusura connessione database');
    });
    
}

/*
    Query per i confronti (se esistono tuple di X con valori Y)
    In caso di successo, ritorna la prima tupla del risultato e un messaggio 'OK';
    In caso contrario, ritorna un oggetto "undefined" e il messaggio di errore.
*/
exports.queryConfronto = function matchQuery(sql, queryParams, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'pass',
        database: 'rtsoftware',
        multipleStatements: true,
        port: 3306
    });
    
    connection.connect(function(error) {
        if(!!error){
            console.log('Errore: impossibile connettersi al database');
            callback(undefined, error);
            return;
        } else {
            console.log('QueryConfronto : Connesso al database');
        }
    });

    connection.query(sql, queryParams, function(err, result, fields) {
        if (err) {
            console.log(err);
            callback(undefined, err);
        }
        else {
            callback(result[0], (result.length > 0) ? "OK" : "NO_MATCH");
        }
    });

    connection.end(function(err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Chiusura connessione database');
    });
}

/*
    Query per aggiornamento di dati
    Successo: ritorna null e un messaggio "OK";
    Fallimento: ritorna null e il messaggio di errore.
*/
exports.queryAggiornamento = function updateQuery(sql, queryParams, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'pass',
        database: 'rtsoftware',
        multipleStatements: true,
        port: 3306
    });
    
    connection.connect(function(error) {
        if(!!error){
            console.log('Errore: impossibile connettersi al database');
            callback(undefined, error);
            return;
        } else {
            console.log('Connesso al database');
        }
    });

    connection.query(sql, queryParams, function(err, result, fields) {
        if (err) {
            console.log(err);
            callback(null, err);
        }
        else {
            callback(null, "OK");
        }
    });

    connection.end(function(err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Close the database connection.');
    });
}

/*
    Query per l'eliminazione di dati
    In caso di successo, ritorna null e un messaggio 'OK';
    In caso contrario, ritorna null e il messaggio di errore.
*/
exports.queryEliminazione = function deleteQuery(sql, queryParams, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'pass',
        database: 'rtsoftware',
        multipleStatements: true,
        port: 3306
    });
    
    connection.connect(function(error) {
        if(!!error){
            console.log('Errore: impossibile connettersi al database');
            callback(undefined, error);
            return;
        } else {
            console.log('Connesso al database');
        }
    });

    connection.query(sql, queryParams, function(err, result, fields) {
        if (err) {
            console.log(err);
            callback(null, err);
        }
        else {
            callback(null, "OK");
        }
    });

    connection.end(function(err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Chiusura connessione database');
    });
}

/*
    Query generica
    Ritorna 'OK' se la connessione è andata a buon fine, 'CONNECTION_ERROR' altrimenti

*/
exports.queryGenerica = function genericQuery(sql, queryParams, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'pass',
        database: 'rtsoftware',
        multipleStatements: true,
        port: 3306
    });
    
    connection.connect(function(error) {
        if(!!error){
            console.log('Errore: impossibile connettersi al database');
            callback(undefined, error);
            return;
        } else {
            console.log('Connesso al database');
        }
    });

    connection.query(sql, queryParams, function(err, result, fields) {
        if (err) {
            console.log(err);
            callback('CONNECTION_ERROR');
        }
        else {
            callback('OK');
        }
    });

    connection.end(function(err) {
        if (err) {
            return console.log('error:' + err.message);
        }
        console.log('Chiusura connessione database');
    });
}

exports.queryRichiestaSpeciale = function requestQuery(sql,  nOspitiAdulti, nOspitiBambini, dataArrivo, dataPartenza, Destinazione, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'pass',
        database: 'rtsoftware',
        multipleStatements: true,
        port: 3306
    });
    
    connection.connect(function(error) {
        if(!!error){
            console.log('Errore: impossibile connettersi al database');
            callback(undefined, error);
            return;
        } else {
            connection.query('SELECT A.*,C.* FROM Alloggi A,Casa C,Comuni COM WHERE A.bnb=0 AND A.id_alloggio=C.ref_alloggio AND A.ref_comune=COM.nome_comune AND COM.nome_comune =' + Destinazione +' AND A.id_alloggio NOT IN ( SELECT A2.id_alloggio FROM prenotazioni P, Alloggi A2 WHERE A.id_alloggio = P.ref_alloggio AND P.ref_alloggio=A2.id_alloggio AND P.stato="accettata" AND ('+dataArrivo+ '<= P.d_inizio AND ' + dataPartenza + '>= P.d_fine)      OR ('+dataArrivo+ '>= P.d_inizio AND ' + dataPartenza + '<= P.d_fine)     ) AND C.posti_letto >= ('+ nOspitiAdulti +' + '+ nOspitiBambini +')', function (err, results) {
                if (err) {
                    console.log(err);
                    callback(undefined, err);
                }
                
                else {
                    console.log(results.length);
                    callback(results, (results.length > 0) ? "OK" : "NO_RESULT");
                    
                }
               })
        }
    });
    console.log('SELECT A.*,C.* FROM Alloggi A,Casa C,Comuni COM WHERE A.bnb=0 AND A.id_alloggio=C.ref_alloggio AND A.ref_comune=COM.nome_comune AND COM.nome_comune =' + Destinazione +' AND A.id_alloggio NOT IN ( SELECT A2.id_alloggio FROM prenotazioni P, Alloggi A2 WHERE A.id_alloggio = P.ref_alloggio AND P.ref_alloggio=A2.id_alloggio AND P.stato="accettata" AND ('+dataArrivo+ '<= P.d_inizio AND ' + dataPartenza + '>= P.d_fine)      OR ('+dataArrivo+ '>= P.d_inizio AND ' + dataPartenza + '<= P.d_fine)     ) AND C.posti_letto >= ('+ nOspitiAdulti +' + '+ nOspitiBambini +')' + "Fisco");


}


exports.queryRichiestaSpeciale2 = function requestQuery(sql,  nOspitiAdulti, nOspitiBambini, dataArrivo, dataPartenza, Destinazione, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'pass',
        database: 'rtsoftware',
        multipleStatements: true,
        port: 3306
    });
    
    connection.connect(function(error) {
        if(!!error){
            console.log('Errore: impossibile connettersi al database');
            callback(undefined, error);
            return;
        } else {
            var sqlpt1='(SELECT A.id_alloggio,A.nome_alloggio,A.descrizione,A.bnb,(C.prezzo*('+ nOspitiAdulti + ' + ' + nOspitiBambini + ')) AS prezzo,A.foto FROM Alloggi A,Casa C,Comuni COM WHERE A.bnb=0 AND A.id_alloggio=C.ref_alloggio AND A.ref_comune=COM.nome_comune AND COM.nome_comune = ' + Destinazione + ' AND NOT EXISTS ( SELECT * FROM prenotazioni P WHERE A.id_alloggio = P.ref_alloggio AND P.stato="accettata" AND (' + dataArrivo + ' <= P.d_inizio AND ' + dataPartenza + '>= P.d_fine) OR (' + dataArrivo + ' >= P.d_inizio AND ' + dataPartenza + ' <= P.d_fine)) AND C.posti_letto >= (' + nOspitiAdulti + ' + ' + nOspitiBambini + ')   )';
            var sqlpt2='(SELECT A.id_alloggio,A.nome_alloggio,A.descrizione,A.bnb,(B.prezzo_singola*(' + nOspitiAdulti + ' + ' + nOspitiBambini + ')) AS prezzo,A.foto FROM bnb B, alloggi A,Comuni COM   Where A.bnb=1 AND B.ref_alloggio=A.id_alloggio AND A.ref_comune=COM.nome_comune AND COM.nome_comune = ' + Destinazione + ' AND  A.id_alloggio NOT IN ( SELECT A2.id_alloggio FROM Alloggi A2, Prenotazioni P, stanzePrenotate S, Bnb B2 WHERE P.id_prenotazione=S.ref_prenotazione AND B2.ref_alloggio=A2.id_alloggio AND P.ref_alloggio=A2.id_alloggio AND P.stato="accettata" AND (' + dataArrivo + ' <= P.d_inizio AND ' + dataPartenza + '>= P.d_fine) OR (' + dataArrivo + '  >= P.d_inizio AND ' + dataPartenza + ' <= P.d_fine) AND ( (B.n_singole-S.singole) + 2 * (B.n_doppie-s.doppie)  + 3 * (B.n_triple-s.triple) + 4 *(B.n_quadruple-s.quadruple) )<(' + nOspitiAdulti + '+' + nOspitiBambini + ') ))';
            console.log(sqlpt1 + 'UNION' + sqlpt2 + "Fisco");
            connection.query(sqlpt1 + 'UNION' + sqlpt2, function (err, results) {
                if (err) {
                    console.log(err);
                    callback(undefined, err);
                }
                
                else {
                    console.log(results);
                    callback(results, (results.length > 0) ? "OK" : "NO_RESULT");
                    
                }
               })
        }
    });
    


}


exports.queryRichiestaSpeciale3 = function requestQuery(sql, idHost, d_inizio, d_fine, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'pass',
        database: 'rtsoftware',
        multipleStatements: true,
        port: 3306
    });

    connection.connect(function (error) {
        if (!!error) {
            console.log('Errore: impossibile connettersi al database');
            callback(undefined, error);
            return;
        } else {
            connection.query('SELECT SUM(P.importo) as Entrate, SUM(P.tasse) as Tasse FROM Prenotazioni P, Alloggi A WHERE P.stato = "confermata" AND P.ref_alloggio = A.id_alloggio AND A.ref_proprietario = ' + idHost + ' AND P.d_inizio>= ' + d_inizio + ' AND P.d_fine < ' + d_fine, function (err, results) {
                if (err) {
                    console.log(err);
                    callback(undefined, err);
                }

                else {
                    console.log(results.length);
                    callback(results, (results.length > 0) ? "OK" : "NO_RESULT");

                }
            })
        }
    });
    console.log('SELECT SUM(P.importo) as Entrate, SUM(P.tasse) as Tasse FROM Prenotazioni P, Alloggi A WHERE P.stato = "confermata" AND P.ref_alloggio = A.id_alloggio AND A.ref_proprietario = ' + idHost + ' AND P.d_inizio>= ' + d_inizio + ' AND P.d_fine < ' + d_fine  + "Fisco");

}
