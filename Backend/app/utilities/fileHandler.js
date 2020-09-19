const multer = require('multer');
const fs = require('fs');

const archiver = require('archiver');
const path = require('path');

//ok
exports.eliminaFile = function(percorsoFile, callback) {
    fs.unlink("./public/" + percorsoFile, (err) => {
        if (err) {
            callback(err)
        }
        else {
            callback("OK");
        }
    });
}


//ok
exports.checkEstensioneFile = function(filename, estensioni, callback) {
    let est = path.extname(filename).toLowerCase();

    if (estensioni.includes(est)) {
        callback(true);
    }
    else {
        callback(false);
    }
}

//ok
exports.checkEstensioneFileMultipli = function(files, estensioni, callback) {
    let errore = false;
    for (let i = 0; i < files.length; i++) {
        let est = path.extname(files[i].originalname).toLowerCase();
        if (estensioni.includes(est)) {
            continue;
        }
        else {
            errore = true;
            break;
        }
    }

    callback(!errore);
}


//-------------------------------------------------------------------------------------------------------//

var docStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/hostdocs');
    },
    filename: function (req, file, cb) {
        cb(null , 'DOC-' + Date.now() + '-' + file.originalname);
    }
});

//OK
exports.uploadDocHost = multer({
    storage: docStorage
}).single('docHost');


//ok
exports.eliminaDocHost = function(nomeFile, callback) {
    fs.unlink('./public/uploads/hostdocs/' + nomeFile, (err) => {
        if (err) {
            callback(err)
        }
        else {
            callback("OK");
        }
    });
}



//-------------------------------------------------------------------------------------------------------//
//OK
// --- Upload/eliminazione di immagini di immobili:
const defaultAlloggio = 'defaultAlloggio.jpg';

var immaginiAlloggiStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/alloggi');
    },
    filename: function (req, file, cb) {
        cb(null , 'IMG-' + Date.now() + '-' + file.originalname);
    }
});
//OK
exports.uploadImmagineAlloggio = multer({
    storage: immaginiAlloggiStorage
}).single('foto');
//OK
exports.eliminaImmagineAlloggio = function(nomeFile, callback) {
    fs.unlink('./public/uploads/alloggi/' + nomeFile, (err) => {
        if (err) {
            callback(err)
        }
        else {
            callback("OK");
        }
    });
}




//-------------------------------------------------------------------------------------------------------//
// --- Upload di documenti degli ospiti:
//OK
var documentiOspitiStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/documentiOspiti');
    },
    filename: function (req, file, cb) {
        cb(null , 'IMG-' + Date.now() + '-' + file.originalname);
    }
});

//ok
exports.uploadDocumentiOspiti = multer({
    storage: documentiOspitiStorage
}).array('documentiOspiti', 50);

//OK
exports.eliminaDocumentoOspite = function(nomeFile, callback) {
    fs.unlink('./public/uploads/documentiOspiti/' + nomeFile, (err) => {
        if (err) {
            callback(err)
        }
        else {
            callback("OK");
        }
    });
}


// Esporta le costanti di default e i percorsi:
exports.defaultAlloggio = defaultAlloggio;
exports.percorsoDefaults = 'defaults/';
exports.percorsoAlloggi = 'uploads/alloggi/';
exports.percorsoDocOspiti = 'uploads/documentiOspiti/';