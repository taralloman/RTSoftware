import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import axios from "axios";

import '../assets/css/CSSN.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import history from "../history";

import Header from './../components/Header';
import Slide from './../components/Slide';
import BoxInformazioni from './../components/BoxInformazioni';
import Footer from './../components/Footer';
import BarraDiRicerca from './../components/BarraDiRicerca';
import { render } from '@testing-library/react';

import BottoneVisualizzaAlloggioHost from './../components/BottoneVisualizzaAlloggioHost';
import BottoneEliminaAccountUtenteAdmin from '../components/BottoneEliminaAccountUtenteAdmin';
import BottoneListaAlloggi from '../components/BottoneListaAlloggi';

class Amministratore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUtente: localStorage.getItem("idUtente"),
            modal: false,
            email: "",
            isLoading: true,
            immobile: null
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        axios
            .post(
                "/getUtenti",
                {
                    testo: "TESTO SCRITTO A MANO",
                    idUtente: this.state.idUtente
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            )
            .then((res) => {
                    this.setState({ utenti: JSON.parse(JSON.stringify(res.data.risultati))});
                    this.setState({ isLoading: false })
                    //alert(JSON.stringify(res.data.data2))

            });
    }

    handleIndietro = () => {
        window.location.reload();
    };

    handleClick = (input) => (e) => {
        this.setState({ [input]: e.target.value });
        this.setState({ isLoading: false });
    };

    render() {
        if (localStorage.getItem("amministratore") != 1){
            history.push("/403")
            window.location.reload()
    
            }
            else{

        if(this.state.isLoading){
            return (
                <div></div>
            );
        }else{
            return(
                <div className="body">
                    <Header />
                    <div className="bodyDimension">
                        
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div style={{backgroundColor: '#FFFFFF'}}>
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <td>
                                        <strong><td>#</td></strong>

                                        <tr><strong>Id utente</strong>
                                            {this.state.utenti.map(utente => <td>{utente.id_utente}</td>)}
                                        </tr>

                                        <tr><strong>Nome</strong>
                                        {this.state.utenti.map(utente => <td>{utente.nome}</td>)}
                                        </tr>

                                        <tr><strong>Cognome</strong>
                                            {this.state.utenti.map(utente => <td>{utente.cognome}</td>)}
                                        </tr>
                                        
                                        <tr><strong>Alloggi</strong>
                                            {this.state.utenti.map(utente => <td><BottoneListaAlloggi
                                            idUtente={utente.id_utente} /></td> )}
                                        </tr>
                                        <tr>
                                            <br></br>
                                            {this.state.utenti.map(utente => <td><BottoneEliminaAccountUtenteAdmin
                                            email={utente} /></td>)}
                                        </tr>
                                    </td>
                                </thead>
                            </Table>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }
    }
    }
}
export default Amministratore;