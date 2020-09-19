//FILE PER LA GESTIONE DELLE ROTTE

//Possibilità di utilizzo di Router per ulteriori reindirizzamenti//

module.exports = function(app) {

const bodyParser = require('body-parser');    
const controllerAccount = require('./../controllers/controllerAccount');
const controllerAlloggi = require('./../controllers/controllerAlloggi');
const controllerContabilita = require('./../controllers/controllerContabilita');
const controllerRicerca = require('./../controllers/controllerRicerca');
const controllerPrenotazioni = require('./../controllers/controllerPrenotazioni');
const fileHandler = require('./../utilities/fileHandler');

// --- --- Gestione di tutte le richieste HTTP:


// --- Gestione Account:
// Autenticazione:
app.post('/getUtenti',controllerAccount.getUtenti);
app.post('/registrazioneUtente', controllerAccount.creaUtente);

app.post('/isLoggedIn',controllerAccount.checkLoggedRes);

app.post('/inserisciOspite',controllerContabilita.inserisciOspite);

app.post('/loginUtente', bodyParser.json(), controllerAccount.loginUtente);
app.post('/logoutUtente', bodyParser.json(), controllerAccount.logoutUtente);
app.post('/recuperoPassword', controllerAccount.recuperoPassword);


// Funzionalità Account:
app.post('/modificaPassword', controllerAccount.modificaPassword);
app.post('/eliminaAccount', controllerAccount.eliminaAccount);
app.post('/modificaProfilo', controllerAccount.modificaProfilo);

// --- Gestione Immobile
app.post('/getAlloggi',controllerAlloggi.richiediAlloggiHost);


app.post('/inserisciAlloggio', fileHandler.uploadImmagineAlloggio, controllerAlloggi.inserisciAlloggio);

app.post('/visualizzaAlloggio', controllerAlloggi.visualizzaAlloggio);
app.post('/eliminaAlloggio', controllerAlloggi.cancellaAlloggio);

app.post('/modificaAlloggio',controllerAlloggi.modificaAlloggio);


// --- Gestione Prenotazione
app.post('/effettuaPrenotazione', controllerPrenotazioni.effettuaPrenotazione);

app.post('/getStanzeDisponibili', controllerAlloggi.getStanzeDisponibili);


app.post('/accettaPrenotazione',controllerPrenotazioni.accettaPrenotazione);
app.post('/annullaPrenotazione', controllerPrenotazioni.annullaPrenotazione);
app.post('/declinaPrenotazione', controllerPrenotazioni.declinaPrenotazione);

app.post('/prenotazioniEffettuate', controllerAccount.richiediPrenotazioniEffettuate);


app.post('/getOspitiPrenotazione',controllerContabilita.getOspitiPrenotazione);


app.post('/getPrenotazioniAccettateDeclinateConfermate', controllerPrenotazioni.getPrenotazioniAccettateDeclinateConfermate);
app.post('/getPrenotazioniAccettateDeclinateConfermateHost', controllerPrenotazioni.getPrenotazioniAccettateDeclinateConfermateHost);

app.post('/getPrenotazioniAttesa',controllerPrenotazioni.getPrenotazioniAttesa);
app.post('/getPrenotazioniAttesaHost',controllerPrenotazioni.getPrenotazioniAttesaHost);



// --- Gestione Ricerca
app.post('/ricerca', controllerRicerca.filtro); //OK, fixare roba del numero massimo di utenti
app.post('/sendDatiOspiti',controllerContabilita.sendDatiOspiti);


// --- Gestione contabilità --- //
app.post('/inviaRendiconto',controllerContabilita.inviaRendiconto);
app.post('/getEntrateHost',controllerContabilita.getEntrateHost); //OK


}