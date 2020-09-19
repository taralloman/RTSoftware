import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid';
import history from "../history";

import '../assets/css/CSSN.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import Header from './../components/Header';
import Footer from './../components/Footer';
import BarraDiRicerca from './../components/BarraDiRicerca';
import VistaAlloggio from '../components/CardVistaAlloggio';



class Ricerca extends Component {
    state = {
        bnb: localStorage.getItem("bnb"),
        dataArrivo: localStorage.getItem("dataArrivo"), //da mettere
        dataPartenza: localStorage.getItem("dataPartenza"),
        destinazione: localStorage.getItem("destinazione"),
        indefinito: localStorage.getItem("indefinito"),
        annunci: JSON.parse(localStorage.getItem("alloggiFiltrati"))
    };


    render() {
        if (localStorage.getItem("alloggiFiltrati") == (null || undefined)){
            history.push("/403")
            window.location.reload()
    
            }
            else{

        if (this.state.indefinito=="false"){
            if (this.state.bnb == "cv") {
                    return (
                        <div>
                            <Header />
                            <div className="body">
                                <div className="bodyDimension">
                                    <BarraDiRicerca />
                                    <div>
                                        <h2 style={{ textAlign: 'center', color: '#FFFFFF' }}>Case Vacanze disponibili</h2>
                                        <br></br>
                                        <Container>
                                            <Row>
                                                {this.state.annunci.map(annuncio => (
                                                    <Col xs="4" sm="4" md="4">
                                                        <VistaAlloggio
                                                            idAlloggio={annuncio.id_alloggio}
                                                            idUtente={localStorage.getItem("idUtente")}
                                                            bnb={this.state.bnb}
                                                            foto={annuncio.percorsoFile}
                                                            nome_alloggio={annuncio.nome_alloggio}
                                                            descrizione={annuncio.descrizione}
                                                            indirizzo={annuncio.indirizzo}
                                                            prezzo={annuncio.prezzo}
                                                            dataPartenza={localStorage.getItem("dataPartenza")}
                                                            dataArrivo={localStorage.getItem("dataArrivo")}
                                                            tassaIntera={annuncio.tassa_intera}
                                                            tassaRidotta={annuncio.tassa_ridotta}
                                                            nOspitiAdulti={localStorage.getItem("nOspitiAdulti")}
                                                            nOspitiBambini={localStorage.getItem("nOspitiBambini")}
                                                        />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                                <br></br>
                                <Footer />
                            </div>
                        </div>
                    );            
            }
            else if (this.state.bnb == "bnb"){
                return (
                    <div>
                        <Header />
                        <div className="body">
                            <div className="bodyDimension">
                                <BarraDiRicerca />
                                <div> 
                                    <h2 style={{ textAlign: 'center', color: '#FFFFFF' }}>B&B disponibili</h2>
                                    <br></br>
                                    <Container className="cardBody">
                                        <Row >
                                            {this.state.annunci.map(annuncio => (
                                                <Col xs="4" sm="4" md="4">
                                                    <VistaAlloggio
                                                        idAlloggio={annuncio.id_alloggio}
                                                        bnb={this.state.bnb}
                                                        foto={annuncio.percorsoFile}
                                                        nome_alloggio={annuncio.nome_alloggio}
                                                        descrizione={annuncio.descrizione}
                                                        indirizzo={annuncio.indirizzo}
                                                        prezzo={annuncio.prezzo}
                                                        idUtente={localStorage.getItem("idUtente")}
                                                        dataPartenza={localStorage.getItem("dataPartenza")}
                                                        dataArrivo={localStorage.getItem("dataArrivo")}
                                                        nOspitiAdulti={localStorage.getItem("nOspitiAdulti")}
                                                        nOspitiBambini={localStorage.getItem("nOspitiBambini")}
                                                        tassaIntera={annuncio.tassa_intera}
                                                        tassaRidotta={annuncio.tassa_ridotta}
                                                    />
                                                </Col>
                                            ))}
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                            <br></br>
                            <Footer />
                        </div>
                    </div>
                );
            }
            else{
                
                return(
                    <div>
                        <Header />
                        <div className="bodyRicerca">
                            <div className="bodyDimension">
                                <BarraDiRicerca />
                                <div>
                                    <h2 style={{ textAlign: 'center', color: '#FFFFFF' }}>Case Vacanze e B&B disponibili</h2>
                                    <br></br>
                                    <Container>
                                        <Row>
                                            {this.state.annunci.map(annuncio => (
                                                <Col xs="4" sm="4" md="4">
                                                    <VistaAlloggio
                                                        idAlloggio={annuncio.id_alloggio}
                                                        bnb={this.state.bnb}
                                                        foto={annuncio.percorsoFile}
                                                        nome_alloggio={annuncio.nome_alloggio}
                                                        descrizione={annuncio.descrizione}
                                                        indirizzo={annuncio.indirizzo}
                                                        prezzo={annuncio.prezzo}
                                                        idUtente={localStorage.getItem("idUtente")}
                                                        dataPartenza={localStorage.getItem("dataPartenza")}
                                                        dataArrivo={localStorage.getItem("dataArrivo")}
                                                        nOspitiAdulti={localStorage.getItem("nOspitiAdulti")}
                                                        nOspitiBambini={localStorage.getItem("nOspitiBambini")}
                                                        tassaIntera={annuncio.tassa_intera}
                                                        tassaRidotta={annuncio.tassa_ridotta}
                                                    />
                                                </Col>
                                            ))}
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                            <br></br>
                            <Footer />
                        </div>
                    </div>
                );            
            }
        }else{
            return(
                <div>
                    <Header />
                    <div className="body">
                        <div className="bodyDimension">
                            <BarraDiRicerca />
                            <h2 style={{ textAlign: 'center', color: '#FFFFFF' }}>Nessun risultato trovato con i precedenti parametri</h2>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}
}
export default Ricerca;