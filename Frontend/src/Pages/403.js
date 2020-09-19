import React, { Component } from "react";
import { Card, CardBody, CardTitle } from 'reactstrap';


import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaMinusCircle } from 'react-icons/fa';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class AccessoNegato extends Component {
  render() {
        return (
        <div>
            <Header />
            <div className="body">
                <div className="bodyDimension" style={{textAlign: 'center'}}>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="ChiSiamo" style={{ width:'800px'}}>
                        <Card style={{width:'800px'}} body >
                            <CardTitle className="cardProfilo">
                                    <FaMinusCircle color="#cb2821" size="200px" />
                                <h1>ERRORE 403</h1>
                            </CardTitle>
                            <CardBody>
                                <h3>Non hai i permessi per accedere alla pagina</h3>
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
                        <br></br>
                        <br></br>
                        <br></br>
                    </div>                   
                </div>
            </div>
            <Footer />
        </div>
        );
    }
}

export default AccessoNegato;