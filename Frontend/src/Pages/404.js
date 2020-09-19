import React, { Component } from "react";

import { Card, CardBody, CardTitle } from 'reactstrap';

import Header from "../components/Header";
import Footer from '../components/Footer';

class PaginaNonTrovata extends Component {
    render() {
        return (
            <div >
                <Header />
                <div className="body">
                    <div className="bodyDimension" style={{ textAlign: 'center' }}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="ChiSiamo" style={{ width: '800px' }}>
                            <Card style={{ width: '800px' }} body >
                                <CardTitle className="cardProfilo"><h1>ERRORE 404</h1></CardTitle>
                                <CardBody>
                                    <h3>La pagina richiesta non è stata trovata</h3>
                                    <a
                                        href="/"
                                        style={{
                                            color: "red",
                                            fontSize: "20px",
                                            textDecoration: "none",
                                        }}
                                        class="glacialRegular"
                                    >Tocca qui per tornare alla home</a>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default PaginaNonTrovata;