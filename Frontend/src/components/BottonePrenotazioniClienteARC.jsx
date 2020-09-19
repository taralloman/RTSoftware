import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import axios from 'axios';


class BottonePrenotazioniClienteARC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            email: "",
            isLoading: true,
            prenotazioni: null,
            idUtente: localStorage.getItem("idUtente"),
            indefinito: false
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
                "/getPrenotazioniAccettateDeclinateConfermate",
                {
                    idUtente: this.state.idUtente
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            )
            .then((res1) => {
                if (res1.data.data !== undefined) {
                    this.setState({ prenotazioni: JSON.parse(JSON.stringify(res1.data.data)) });
                } else {
                    this.setState({ indefinito: true })
                }
                this.setState({ isLoading: false })

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
        if (this.state.isLoading) {
            return (<div></div>)
        }
        else {
            if (!this.state.indefinito) {
                return (
                    <div>
                        <Button color='danger' onClick={this.toggle}>Visualizza</Button>
                        <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Lista delle prenotazioni effettuate che sono state accettate, rifiutate o confermate dai rispettivi proprietari</ModalHeader>
                            <ModalBody style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>

                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <td>
                                            <tr><strong>Nome alloggio</strong>
                                                {this.state.prenotazioni.map(prenotazione => <td>{prenotazione.nome_alloggio}</td>)}
                                            </tr>

                                            <tr><strong>Stato prenotazione</strong>
                                                {this.state.prenotazioni.map(prenotazione => <td>{prenotazione.stato}</td>)}
                                            </tr>

                                            <tr><strong>Data di arrivo</strong>
                                                {this.state.prenotazioni.map(prenotazione => <td>{prenotazione.d_inizio.length > 10
                                                    ? prenotazione.d_inizio.substring(8, 10) + "\\" + prenotazione.d_inizio.substring(5, 7) + "\\" + prenotazione.d_inizio.substring(0, 4)
                                                    : ""}</td>)}

                                            </tr>

                                            <tr><strong>Data di partenza</strong>
                                                {this.state.prenotazioni.map(prenotazione => <td>{
                                                    prenotazione.d_fine.length > 10
                                                        ? prenotazione.d_fine.substring(8, 10) + "\\" + prenotazione.d_fine.substring(5, 7) + "\\" + prenotazione.d_fine.substring(0, 4)
                                                        : ""}</td>)}
                                            </tr>
                                            <tr><strong>Data di prenotazione</strong>
                                                {this.state.prenotazioni.map(prenotazione => <td>{
                                                    prenotazione.d_prenotazione.length > 10
                                                        ? prenotazione.d_prenotazione.substring(8, 10) + "\\" + prenotazione.d_prenotazione.substring(5, 7) + "\\" + prenotazione.d_prenotazione.substring(0, 4)
                                                        : ""}</td>)}
                                            </tr>

                                            <tr><strong>Numero di adulti</strong>
                                                {this.state.prenotazioni.map(prenotazione => <td>{prenotazione.n_adulti}</td>)}
                                            </tr>

                                            <tr><strong>Numero di adulti esenti dalla tassa</strong>
                                                {this.state.prenotazioni.map(prenotazione => <td>{prenotazione.n_adulti_esenti}</td>)}
                                            </tr>

                                            <tr><strong>Numero di minori</strong>
                                                {this.state.prenotazioni.map(prenotazione => <td>{prenotazione.n_ridotti}</td>)}
                                            </tr>

                                            <tr><strong>Numero di ridotti esenti dalla tassa</strong>
                                                {this.state.prenotazioni.map(prenotazione => <td>{prenotazione.n_ridotti_esenti}</td>)}
                                            </tr>

                                            <tr><strong>Prezzo</strong>
                                                {this.state.prenotazioni.map(prenotazione => <td>{prenotazione.importo}</td>)}
                                            </tr>
                                            
                                        </td>
                                    </thead>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' onClick={this.handleIndietro}>Torna al profilo</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Button disabled color='danger' onClick={this.toggle}>Visualizza</Button>
                        <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

                            <ModalBody style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
                                <h4>Non ci sono prenotazioni da visualizzare</h4>
                            </ModalBody>
                            <ModalFooter>
                                <Button color='primary' onClick={this.handleIndietro}>Torna al profilo</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                );
            }
        }
        
    }
}

export default BottonePrenotazioniClienteARC;