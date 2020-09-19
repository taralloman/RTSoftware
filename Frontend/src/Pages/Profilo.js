import React, { Component } from 'react';

import { Card, CardTitle, Row, Col } from 'reactstrap';

import history from "../history";

import '../assets/css/CSSN.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import Header from './../components/Header';
import Footer from './../components/Footer';
import BottoneListaAlloggi from '../components/BottoneListaAlloggi';
import BottoneModificaProfilo from '../components/BottoneModificaProfilo';
import BottoneModificaPassword from './../components/BottoneModificaPassword';
import BottoneEliminaProfilo from './../components/BottoneEliminaProfilo';



class Profilo extends Component {
    render() {
        if (localStorage.getItem("email") == null){
        history.push("/403")
        window.location.reload()

        }
        else{
            return(
                <div className="body" >
                    <Header />
                    <div style={{marginLeft:'7%'}} className="bodyDimension">
                        <div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div>
                                <Row>
                                    <Col sm={{ size: 4,  offset: 1 }}>
                                        <Card body className="text-center">
                                            <CardTitle className="cardProfilo">Modifica profilo</CardTitle>
                                            <BottoneModificaProfilo />
                                        </Card>
                                    </Col>

                                    <Col sm={{ size: 4,  offset: 1 }}>
                                        <Card body className="text-center">
                                            <CardTitle className="cardProfilo">Modifica password</CardTitle>
                                            <BottoneModificaPassword />
                                        </Card>
                                    </Col>
                                    
                                    
                                </Row>

                                <br></br>

                                <Row>
                                    <Col sm={{ size: 4,  offset: 1 }}>
                                        <Card body className="text-center">
                                            <CardTitle className="cardProfilo">Elimina profilo</CardTitle>
                                            <BottoneEliminaProfilo />
                                        </Card>
                                    </Col>

                                    <Col sm={{ size: 4,  offset: 1 }}>
                                        <Card body className="text-center">
                                            <CardTitle className="cardProfilo">Lista alloggi</CardTitle>
                                            <BottoneListaAlloggi idUtente={localStorage.getItem("idUtente")} />
                                        </Card>
                                    </Col>
                                </Row>
                            </div>                
                        </div>
                        <br></br>
                        <br></br>
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}
export default Profilo;