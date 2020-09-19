import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class BottoneDeclinaPrenotazione extends React.Component {
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
                "/declinaPrenotazione",
                {
                    idPrenotazione: this.props.idPrenotazione,
                    motivo: this.state.motivo
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
                <Button color='danger' onClick={this.toggle}>Declina</Button>
                <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>DECLINA PRENOTAZIONE</ModalHeader>
                    <ModalBody>
                        <div>
                            <label>
                                Motivo del declino
                                <br></br>
                                    <input type="text" name="declino" onChange={this.handleChange("motivo")}/>
                            </label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='light' onClick={this.handleAnnulla}>Annulla</Button>
                        <Button color='primary' onClick={this.handleConferma}>Declina</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    }
}
export default BottoneDeclinaPrenotazione;
