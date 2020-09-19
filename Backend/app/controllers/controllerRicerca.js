const ricercaDAO = require('../dao/ricercaDAO');
const Joi = require('@hapi/joi');
const fileHandler = require('../utilities/fileHandler');


exports.filtro = function (req, res) {
    console.log(req.body.dataArrivo.toLocaleString());
    console.log(req.body.dataPartenza+ "XDXD");
    const schema = Joi.object({
        nOspitiAdulti: Joi.required(),
        nOspitiBambini: Joi.required(),
        dataArrivo: Joi.required(),
        dataPartenza: Joi.required(),
        destinazione: Joi.required(),
        bnb: Joi.required()
    });

     obj = {
        nOspitiAdulti: req.body.nOspitiAdulti,
        nOspitiBambini: req.body.nOspitiBambini,
        dataArrivo: req.body.dataArrivo,
        dataPartenza: req.body.dataPartenza,
        destinazione: req.body.destinazione,
        bnb: req.body.bnb
    };

     check = schema.validate(obj);

    if (check.error === undefined) {
        if (req.body.bnb == "cv") //cerco le case
        {
            ricercaDAO.ricercaCasa(req.body.nOspitiAdulti, req.body.nOspitiBambini, req.body.dataArrivo, req.body.dataPartenza, req.body.destinazione,
                function (result, msg) {
                    if (msg === "OK") {
                        result.forEach(function (item) {
                            let percorsoFile = '';
                            if (item.foto === fileHandler.defaultAlloggio || item.foto == null) {
                                percorsoFile = fileHandler.percorsoDefaults + fileHandler.defaultAlloggio;
                            }
                            else {
                                percorsoFile = fileHandler.percorsoAlloggi + item.foto;
                            }
                            item["percorsoFile"] = percorsoFile;

                        });
                        res.send({ success: true, data: JSON.stringify(result), message: "Stiamo filtrando gli alloggi a nostra disposizione..." });
                        console.log(JSON.stringify(result));
                    }
                    else if (msg === "NO_RESULT") {
                        res.send({ success: true, data: undefined, message: "Non esistono alloggi per questa ricerca" });
                    }
                    else {
                        res.send({ success: false, message: "Errore :" + msg });
                    }
                });
        }
        else if(req.body.bnb == "bnb") {
            ricercaDAO.ricercaBnB(req.body.nOspitiAdulti, req.body.nOspitiBambini, req.body.dataArrivo, req.body.dataPartenza, req.body.destinazione,
                function (result, msg) {
                    console.log(JSON.stringify(result)+"Yessa");
                    if (msg === "OK") {
                        for (let i = 0; i < 5; i++) {
                            result.shift();
                        }
                        result[0].forEach(function (item) {
                            let percorsoFile = '';
                            if (item.foto === fileHandler.defaultAlloggio || item.foto == null) {
                                percorsoFile = fileHandler.percorsoDefaults + fileHandler.defaultAlloggio;
                            }
                            else {
                                percorsoFile = fileHandler.percorsoAlloggi + item.foto;
                            }
                            item["percorsoFile"] = percorsoFile;
                        });
                        res.send({ success: true, data: JSON.stringify(result[0]), message: "Stiamo filtrando gli alloggi a nostra disposizione..." });
                        console.log(JSON.stringify(result[0]));
                    }
                    else if (msg === "NO_RESULT") {
                        res.send({ success: true, data: undefined, message: "Non esistono alloggi per questa ricerca" });
                    }
                    else {
                        res.send({ success: false, message: "Errore :" + msg });
                    }
                });
        }else {
            // query ricerca generica (per tutti gli alloggi)
            ricercaDAO.ricerca(req.body.nOspitiAdulti, req.body.nOspitiBambini, req.body.dataArrivo, req.body.dataPartenza, req.body.destinazione,
                function (result, msg) {

                    if (msg === "OK") {
                        result.forEach(function (item) {
                            let percorsoFile = '';
                            if (item.foto === fileHandler.defaultAlloggio || item.foto == null) {
                                percorsoFile = fileHandler.percorsoDefaults + fileHandler.defaultAlloggio;
                            }
                            else {
                                percorsoFile = fileHandler.percorsoAlloggi + item.foto;
                            }
                            item["percorsoFile"] = percorsoFile;

                        });
                        res.send({ success: true, data: JSON.stringify(result), message: "Stiamo filtrando gli alloggi a nostra disposizione..." });
                        console.log(JSON.stringify(result));
                    }
                    else if (msg === "NO_RESULT") {
                        res.send({ success: true, data: undefined, message: "Non esistono alloggi per questa ricerca" });
                    }
                    else {
                        res.send({ success: false, message: "Errore :" + msg });
                    }
                });
        }

    }
    else {
        res.send({ success: false, message: "Per potere ricercare bisogna inserire tutti i paramentri,ATTENZIONE" });
    }

}