import React, { Component } from 'react';
import { Card, CardTitle, Row, Col } from 'reactstrap';

import history from "../history";

import '../assets/css/CSSN.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BottonePrenotazioniClienteARC from '../components/BottonePrenotazioniClienteARC';
import BottonePrenotazioniClienteIA from '../components/BottonePrenotazioniClienteIA';
import BottonePrenotazioniProprietarioARC from '../components/BottonePrenotazioniProprietarioARC';
import BottonePrenotazioniProprietarioIA from '../components/BottonePrenotazioniProprietarioIA';

class ListaPrenotazioni extends Component {

    render() {
        if (localStorage.getItem("email") == null) {
            history.push("/403")
            window.location.reload() 
        }else {
            return (
                <div>
                    <Header />
                    <div className="body" style={{ textAlign: 'center' }}>
                        <div className="bodyDimension" style={{ marginLeft: '7%' }}>
                            <br></br>
                            <h4 style={{ color: "#d4d4d5", marginLeft: '-8%' }}>Prenotazioni ricevute (PROPRIETARIO)</h4>
                            <Row>

                                <Col sm={{ size: 4, offset: 1 }}>
                                    <Card body className="text-center">
                                        <CardTitle className="cardProfilo">In attesa</CardTitle>
                                        <BottonePrenotazioniProprietarioIA />
                                    </Card>
                                </Col>

                                <Col sm={{ size: 4, offset: 1 }}>
                                    <Card body className="text-center">
                                        <CardTitle className="cardProfilo">Accettate/rifiutate/confermate</CardTitle>
                                        <BottonePrenotazioniProprietarioARC />
                                    </Card>
                                </Col>


                            </Row>

                            <br></br>
                            <h4 style={{ color: "#d4d4d5", marginLeft: '-9.5%' }}>Prenotazioni effettuate (CLIENTE)</h4>
                            <Row>

                                <Col sm={{ size: 4, offset: 1 }}>
                                    <Card body className="text-center">
                                        <CardTitle className="cardProfilo">In attesa</CardTitle>
                                        <BottonePrenotazioniClienteIA />
                                    </Card>
                                </Col>

                                <Col sm={{ size: 4, offset: 1 }}>
                                    <Card body className="text-center">
                                        <CardTitle className="cardProfilo">Accettate/rifiutate/confermate</CardTitle>
                                        <BottonePrenotazioniClienteARC />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}
export default ListaPrenotazioni;