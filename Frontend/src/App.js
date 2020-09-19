import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import Home from './Pages/Home';
import Profilo from './Pages/Profilo';
import Prenotazioni from './Pages/Prenotazioni';
import ChiSiamo from './Pages/ChiSiamo';
import RegistrazioneUtente from './Pages/RegistrazioneUtente';
import Login from './Pages/PannelloLogin';
import RegistrazioneAlloggio from './Pages/RegistrazioneAlloggio';
import Ricerca from './Pages/Ricerca';
import history from './history';
import Amministratore from './Pages/Amministratore';
import AccessoNegato from './Pages/403';
import PaginaNonTrovata from './Pages/404';



class App extends Component {

  render(){
    return (
      <Router history={history}>
        <Switch>
          //Route principali
          <Route exact path="/" component={Home} />
          <Route exact path="/Profilo" component={Profilo} />
          <Route exact path="/Prenotazioni" component={Prenotazioni} />
          <Route exact path="/ChiSiamo" component={ChiSiamo} />
          <Route exact path="/Registrazione" component={RegistrazioneUtente} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/RegistrazioneAlloggio" component={RegistrazioneAlloggio} />
          <Route exact path="/Ricerca" component={Ricerca} />
          <Route exact path="/Amministratore" component={Amministratore} />

          //Route errori
          <Route exact path="/403" component={AccessoNegato} />
          <Route component={PaginaNonTrovata} />

        </Switch>
      </Router>
    );
  }
}

export default App;