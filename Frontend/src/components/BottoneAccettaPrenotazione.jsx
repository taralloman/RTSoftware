import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class BottoneAccettaPrenotazione extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
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

    handleConferma = (event) => {
        event.preventDefault();
        axios
            .post(
                "/accettaPrenotazione",
                {
                    idPrenotazione: this.props.idPrenotazione
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            )
            .then(() => {
                window.location.reload();
            });
    };

    handleAnnulla = () => {
        window.location.reload();
    };

    render() {    
        return (
            <div>
                <Button color='danger' onClick={this.toggle}>Accetta</Button>
                <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>ACCETTA PRENOTAZIONE</ModalHeader>
                    <ModalBody>
                        Sei sicuro di volere accettare la prenotazione?
                </ModalBody>
                    <ModalFooter>
                        <Button color='light' onClick={this.handleAnnulla}>Annulla</Button>
                        <Button color='primary' onClick={this.handleConferma}>Conferma</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
        
    }
}
export default BottoneAccettaPrenotazione;
