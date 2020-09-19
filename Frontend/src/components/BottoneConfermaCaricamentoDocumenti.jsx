import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import axios from "axios";

class BottoneConfermaCaricamentoDocumenti extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            cfValido: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };


    handleIndietro = () => {
        window.location.reload();
    };


    handleInvioDocumenti = () => {
            axios
                .post(
                    "/sendDatiOspiti",
                    {
                        idAlloggio: this.props.idAlloggio,
                        idPrenotazione: this.props.ref_prenotazione
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    if (res.data.result == true) {

                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
    }

    render() {

        if (this.props.disabled == 1) {
            return (
                <div style={{textAlign:'center'}}>
                    <Button disabled color='danger' onClick={this.toggle}>{this.props.buttonLabel}Conferma</Button>
                </div>
            );
        }
        else {
            return (
                <div style={{textAlign:'center'}}>
                    <Button color='danger' onClick={this.handleInvioDocumenti}>{this.props.buttonLabel}Conferma</Button>
                    <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>CARICAMENTO DOCUMENTI</ModalHeader>
                        <ModalBody className="body">
                            <h3>I dati relativi alla prenotazione {this.props.ref_prenotazione} sono stati inviati</h3>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='light' onClick={this.handleIndietro}>Torna al profilo</Button>
                            
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }
    }
}

export default BottoneConfermaCaricamentoDocumenti;
