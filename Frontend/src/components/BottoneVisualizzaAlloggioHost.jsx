import React, { Component } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import BottoneModificaAlloggio from './../components/BottoneModificaAlloggio';
import BottoneEliminaAlloggio from './../components/BottoneEliminaAlloggio';

import '../assets/css/CSSN.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';


class BottoneVisualizzaAlloggioHost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            modal: false,
            idAlloggio: this.props.idAlloggio
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    };

    handleIndietro = () => {
        window.location.reload();
    };

    componentDidMount() {

        axios
            .post(
                "/visualizzaAlloggio",
                {
                    idAlloggio: this.state.idAlloggio
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            )
            .then((res) => {
                if (res.data.success) {


                    this.setState({ datiAlloggio: JSON.parse(res.data.datiAlloggio) });
                    if (this.state.datiAlloggio.bnb == 0) {
                        this.setState({ datiCasa: JSON.parse(res.data.datiCasa) });
                    } else {
                        this.setState({ datiBnB: JSON.parse(res.data.datiBnB) });
                    }
                    this.setState({ isLoading: false })


                } else {
                    alert(res.data.message)
                }
            });
    }

    getInitialState() {
        return ({
            modal: false
        });
    };

    modalToggle() {
        this.setState({ modal: !this.state.modal })
    };

    render() {
        if (this.state.isLoading) {
            return (
                <div></div>
            );
        } else {

            if (this.state.datiAlloggio.bnb == 1) {
                return (
                    <div>
                        <Button color='danger' onClick={this.toggle}>Visualizza alloggio</Button>
                        <div className="modal">
                            <Modal size='xl' dialogClassName="modal-dialog" centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}><h4>{this.state.datiAlloggio.nome_alloggio}</h4></ModalHeader>
                                <ModalBody>
                                    <div class="container" >
                                        <img src={this.state.datiAlloggio.foto} style={{ width: '450px', height: 'auto' }} alt=""/>
                                        <br></br>
                                        <h5><strong>Annuncio di</strong>: Emanuele Ferrara{this.state.datiAlloggio.nome_proprietario}</h5>
                                        <h5><strong>Per informazioni, rivolgersi a</strong>:</h5>
                                        <p style={{ fontSize: '16px' }}>emaferrara99@gmail.com{this.state.datiAlloggio.email}</p>


                                        <h5><strong>Descrizione</strong></h5>
                                        <p style={{ fontSize: '16px' }}>{this.state.datiAlloggio.descrizione}</p>
                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Camera singola</th>
                                                    <th>Camera doppia</th>
                                                    <th>Camera tripla</th>
                                                    <th>Camera quadrupla</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><i>Quantità</i></td>
                                                    <td>{this.state.datiBnB.n_singole}</td>
                                                    <td>{this.state.datiBnB.n_doppie}</td>
                                                    <td>{this.state.datiBnB.n_triple}</td>
                                                    <td>{this.state.datiBnB.n_quadruple}</td>
                                                </tr>
                                                <tr>
                                                    <td><i>Prezzo</i></td>
                                                    <td>{this.state.datiBnB.prezzo_singola}</td>
                                                    <td>{this.state.datiBnB.prezzo_doppia}</td>
                                                    <td>{this.state.datiBnB.prezzo_tripla}</td>
                                                    <td>{this.state.datiBnB.prezzo_quadrupla}</td>

                                                </tr>
                                            </tbody>
                                        </Table>
                                        <h5><strong>Indirizzo</strong></h5>
                                        <p style={{ fontSize: '16px' }}>{"Campania, "}{this.state.datiAlloggio.ref_comune}{", "}{this.state.datiAlloggio.indirizzo}</p>
                                        <h5><strong>Tipo di pagamento acconsentito</strong></h5>
                                        <p style={{ fontSize: '16px' }}>{this.state.datiAlloggio.tipo_pagamento}</p>

                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='light' onClick={this.handleIndietro}>Torna ai risultati</Button>
                                    <BottoneEliminaAlloggio idAlloggio={this.state.datiAlloggio.id_alloggio}/>
                                    <BottoneModificaAlloggio
                                        bnb={this.state.datiAlloggio.bnb}
                                        idAlloggio={this.state.datiAlloggio.id_alloggio}
                                        nome_alloggio= {this.state.datiAlloggio.nome_alloggio}
                                        descrizione= {this.state.datiAlloggio.descrizione}
                                        tassa_intera= {this.state.datiAlloggio.tassa_intera}
                                        tassa_ridotta= {this.state.datiAlloggio.tassa_ridotta}
                                        prezzo_singola= {this.state.datiBnB.prezzo_singola}
                                        prezzo_doppia= {this.state.datiBnB.prezzo_doppia}
                                        prezzo_tripla= {this.state.datiBnB.prezzo_tripla}
                                        prezzo_quadrupla= {this.state.datiBnB.prezzo_quadrupla}
                                        regione= "Campania"
                                        ref_comune= {this.state.datiAlloggio.ref_comune}
                                        indirizzo= {this.state.datiAlloggio.indirizzo}
                                        n_singole= {this.state.datiBnB.n_singole}
                                        n_doppie= {this.state.datiBnB.n_doppie}
                                        n_triple= {this.state.datiBnB.n_triple}
                                        n_quadruple= {this.state.datiBnB.n_quadruple}
                                        foto= {this.state.datiAlloggio.foto}
                                    />
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Button color='danger' onClick={this.toggle}>Visualizza alloggio</Button>
                        <div className="modal">
                            <Modal size='xl' dialogClassName="modal-dialog" centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}><h4>{this.state.datiAlloggio.nome_alloggio}</h4></ModalHeader>
                                <ModalBody>
                                    <div class="container" >

                                        <img src={this.state.datiAlloggio.foto} style={{ width: '450px', height: 'auto' }} alt=""/>
                                        <br></br>
                                        <h5><strong>Annuncio di</strong>: Emanuele Ferrara{this.state.datiAlloggio.nome_proprietario}</h5>
                                        <h5><strong>Per informazioni, rivolgersi a</strong>:</h5>
                                        <p style={{ fontSize: '16px' }}>emaferrara99@gmail.com{this.state.datiAlloggio.email}</p>


                                        <h5><strong>Descrizione</strong></h5>
                                        <p style={{ fontSize: '16px' }}>{this.state.datiAlloggio.descrizione}</p>

                                        <h5><strong>Indirizzo</strong></h5>
                                        <p style={{ fontSize: '16px' }}>{"Campania, "}{this.state.datiAlloggio.ref_comune}{", "}{this.state.datiAlloggio.indirizzo}</p>

                                        <h5><strong>Numero posti letto</strong>:</h5>
                                        <p style={{ fontSize: '16px' }}>{this.state.datiCasa.posti_letto}</p>

                                        <h5><strong>Numero bagni</strong>:</h5>
                                        <p style={{ fontSize: '16px' }}>{this.state.datiCasa.n_bagni}</p>

                                        <h5><strong>Prezzo</strong>:</h5>
                                        <p style={{ fontSize: '16px' }}>{this.state.datiCasa.prezzo}</p>

                                        <h5><strong>Tipo di pagamento acconsentito</strong></h5>
                                        <p style={{ fontSize: '16px' }}>{this.state.datiAlloggio.tipo_pagamento}</p>

                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='light' onClick={this.handleIndietro}>Torna ai risultati</Button>
                                    <BottoneEliminaAlloggio idAlloggio={this.state.datiAlloggio.id_alloggio}/>
                                    <BottoneModificaAlloggio 
                                        bnb={this.state.datiAlloggio.bnb}
                                        idAlloggio={this.state.datiAlloggio.id_alloggio}
                                        nome_alloggio= {this.state.datiAlloggio.nome_alloggio}
                                        descrizione= {this.state.datiAlloggio.descrizione}
                                        tassa_intera= {this.state.datiAlloggio.tassa_intera}
                                        tassa_ridotta= {this.state.datiAlloggio.tassa_ridotta}
                                        prezzo= {this.state.datiCasa.prezzo}
                                        regione= "Campania"
                                        ref_comune= {this.state.datiAlloggio.ref_comune}
                                        indirizzo= {this.state.datiAlloggio.indirizzo}
                                        n_bagni= {this.state.datiCasa.n_bagni}
                                        posti_letto= {this.state.datiCasa.posti_letto}
                                        foto= {this.state.datiAlloggio.foto}
                                        />
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                );
            }

        }
    }
}
export default BottoneVisualizzaAlloggioHost;
