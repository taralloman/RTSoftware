const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const contabilitaControl = require('./app/controllers/controllerContabilita');
const prenotazioneControl = require('./app/controllers/controllerPrenotazioni');

app.enable('trust proxy');

app.use(cors({origin: true}));

/*
app.use (function (req, res, next) {
  if (req.secure) {
          // request was via https, so do no special handling
          next();
  } else {
          // request was via http, so redirect to https
          console.log(req.url);
          res.redirect('https://'+req.headers.host+ req.url);
  }
});*/



app.use(bodyParser.urlencoded({ extended: true })); //
app.use(bodyParser.json());//
app.use(bodyParser.raw());//

app.use(express.static('public'));//

var routes = require('./app/routes/routes'); //IMPORTO LA ROUTE
routes(app); //REGISTRO LA ROUTE
//app.use("/",routes);

// --- Inizializza i timer per far scattare i controlli periodici:
const day = 24 * 60 * 60 * 1000;
setInterval(contabilitaControl.avvisoRendicontoTrimestrale, day);



// app.listen(1337);
module.exports = app;


