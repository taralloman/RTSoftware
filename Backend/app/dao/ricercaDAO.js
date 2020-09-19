const db = require('../utilities/database');

//filtro per la ricerca

exports.ricercaCasa = function (nOspitiAdulti, nOspitiBambini, dataArrivo, dataPartenza, Destinazione, callback) {
    let sql = `
SET @nOspitiAdulti=?;
SET @nOspitiBambini=?;
SET @dataArrivo=?;
SET @dataPartenza=?;
SET @Destinazione=?;

SELECT A.*,C.*
     FROM Alloggi A,Casa C,Comuni COM
     WHERE A.bnb=0
         AND A.id_alloggio=C.ref_alloggio
         AND A.ref_comune=COM.nome_comune
         AND COM.nome_comune = @Destinazione
         AND A.id_alloggio NOT IN (
            SELECT A2.id_alloggio
            FROM prenotazioni P, Alloggi A2
            WHERE A.id_alloggio = P.ref_alloggio
            AND P.ref_alloggio=A2.id_alloggio
            AND P.stato='accettata'
                AND (@dataArrivo <= P.d_inizio AND @dataPartenza>= P.d_fine)
                OR (@dataArrivo >= P.d_inizio AND @dataPartenza <= P.d_fine)
        )
        AND C.posti_letto >= (@nOspitiAdulti + @nOspitiBambini);             
`
    let destinazione = JSON.stringify(Destinazione);
    let i = [nOspitiAdulti, nOspitiBambini, dataArrivo, dataPartenza, Destinazione];
    db.queryRichiestaSpeciale(sql, nOspitiAdulti, nOspitiBambini, dataArrivo, dataPartenza, destinazione , callback);
}



//ricerca bnb
exports.ricercaBnB = function (nOspitiAdulti, nOspitiBambini, dataArrivo, dataPartenza, Destinazione, callback) {
    let sql = `
SET @nOspitiAdulti=?;
SET @nOspitiBambini=?;
SET @dataArrivo=?;
SET @dataPartenza=?;
SET @Destinazione=?;

SELECT A.*,(B.prezzo_singola*(@nOspitiAdulti + @nOspitiBambini)) AS prezzo 
    FROM bnb B, alloggi A,Comuni COM  
    Where A.bnb=1
        AND B.ref_alloggio=A.id_alloggio
        AND A.ref_comune=COM.nome_comune
        AND COM.nome_comune = @Destinazione
        AND  A.id_alloggio NOT IN (
                                    SELECT A2.id_alloggio
                                    FROM Alloggi A2, Prenotazioni P, stanzePrenotate S, Bnb B2
                                    WHERE P.id_prenotazione=S.ref_prenotazione
                                    AND B2.ref_alloggio=A2.id_alloggio
                                    AND P.ref_alloggio=A2.id_alloggio
                                    AND P.stato='accettata'
                                    AND (@dataArrivo <= P.d_inizio AND @dataPartenza>= P.d_fine)
                                    OR (@dataArrivo >= P.d_inizio AND @dataPartenza <= P.d_fine)
                                    AND ( (B.n_singole-S.singole) + 2 * (B.n_doppie-s.doppie) 
                                        + 3 * (B.n_triple-s.triple) + 4 *(B.n_quadruple-s.quadruple) )<(@nOspitiAdulti+@nOspitiBambini)
                                        )
                                
                                    ;            
`

    let i = [nOspitiAdulti, nOspitiBambini, dataArrivo, dataPartenza, Destinazione];
    db.queryRichiesta(sql, i, callback);
}

//con tutti
exports.ricerca = function (nOspitiAdulti, nOspitiBambini, dataArrivo, dataPartenza, Destinazione, callback) {
    let sql = `
SET @nOspitiAdulti=?;
SET @nOspitiBambini=?;
SET @dataArrivo=?;
SET @dataPartenza=?;
SET @Destinazione=?;
    (
        

     SELECT A.*,(C.prezzo*(@nOspitiAdulti + @nOspitiBambini)) AS prezzo
     FROM Alloggi A,Casa C,Comuni COM
     WHERE A.bnb=0
         AND A.id_alloggio=C.ref_alloggio
         AND A.ref_comune=COM.nome_comune
         AND COM.nome_comune = @Destinazione
         AND NOT EXISTS (
            SELECT *
            FROM prenotazioni P
            WHERE A.id_alloggio = P.ref_alloggio
            AND P.stato='accettata'
                AND (@dataArrivo <= P.d_inizio AND @dataPartenza>= P.d_fine)
                OR (@dataArrivo >= P.d_inizio AND @dataPartenza <= P.d_fine)
        )
        AND C.posti_letto >= (@nOspitiAdulti + @nOspitiBambini)   
    )
    
    UNION
     (  
        SELECT A.*,(B.prezzo_singola*(@nOspitiAdulti + @nOspitiBambini)) AS prezzo
        FROM bnb B, alloggi A,Comuni COM  
        Where A.bnb=1
            AND B.ref_alloggio=A.id_alloggio
            AND A.ref_comune=COM.nome_comune
            AND COM.nome_comune = @Destinazione
            AND  A.id_alloggio NOT IN (
                                        SELECT A2.id_alloggio
                                        FROM Alloggi A2, Prenotazioni P, stanzePrenotate S, Bnb B2
                                        WHERE P.id_prenotazione=S.ref_prenotazione
                                        AND B2.ref_alloggio=A2.id_alloggio
                                        AND P.ref_alloggio=A2.id_alloggio
                                        AND P.stato='accettata'
                                        AND (@dataArrivo <= P.d_inizio AND @dataPartenza>= P.d_fine)
                                        OR (@dataArrivo >= P.d_inizio AND @dataPartenza <= P.d_fine)
                                        AND ( (B.n_singole-S.singole) + 2 * (B.n_doppie-s.doppie) 
                                            + 3 * (B.n_triple-s.triple) + 4 *(B.n_quadruple-s.quadruple) )<(@nOspitiAdulti+@nOspitiBambini)
                                            )
                                    
                                           
     );
        
     
    `

    let destinazione = JSON.stringify(Destinazione);
    let i = [nOspitiAdulti, nOspitiBambini, dataArrivo, dataPartenza, Destinazione];
    db.queryRichiestaSpeciale2(sql, nOspitiAdulti, nOspitiBambini, dataArrivo, dataPartenza, destinazione, callback);
}