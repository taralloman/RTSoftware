import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from 'axios';


class BottoneRichiediEntrate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            idUtente: localStorage.getItem("idUtente"),
            richiesta: false,
            d_inizio: null,
            d_fine: null,
            valido: null,
            entrate: 0,
            tassa: 0
        };

        this.toggle = this.toggle.bind(this);
    }

    analyze() {
        if (this.state.d_inizio != null) {
            localStorage.setItem("valido", true)
        }
        else {
            localStorage.setItem("valido", false)
            alert("Attenzione, controlla i parametri da inserire")
        }
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleGetEntrate = () => {
        {this.analyze()};
        if(localStorage.getItem("valido") =="true"){
            axios
                .post(
                    "/getEntrateHost",
                    {
                        id_proprietario: this.state.idUtente,
                        idAlloggio: this.props.idAlloggio,
                        d_inizio: this.state.d_inizio,
                        d_fine: this.state.d_fine
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                )
                .then((res1) => {
                    if (res1.data.success == true) {
                        this.setState({ richiesta: true });
                        this.setState({ modal: true });
                        this.setState({entrate: res1.data.data.Entrate});
                        this.setState({ tasse: res1.data.data.Tasse });
                    }
                });
            }
        }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };

    handleIndietro = () => {
        window.location.reload();
    };

    render() {
        if(!this.state.richiesta){
            return (
                <div>
                    <Button color='danger' onClick={this.toggle}>Richiesta entrate</Button>
                    <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Richiesta entrate</ModalHeader>
                        <ModalBody style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
                            <AvForm onValidSubmit={this.onValidSubmit}>
                                
                                <span>Data inizio entrate</span>
                                <AvField
                                    name="d_inizio"
                                    onChange={this.handleChange("d_inizio")}
                                    type="date"
                                    max={new Date().toJSON().slice(0,10)}
                                    onfocus="(this.type='date')"
                                    errorMessage="Data non valida"
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: "Data mancante",
                                        }
                                    }}
                                />

                                <span>Data fine entrate</span>
                                <AvField
                                    name="d_fine"
                                    onChange={this.handleChange("d_fine")}
                                    type="date"
                                    min={this.state.d_inizio}
                                    max={new Date().toJSON().slice(0, 10)}
                                    onfocus="(this.type='date')"
                                    errorMessage="Data non valida"
                                    validate={{
                                        required: {
                                            value: true,
                                            errorMessage: "Data mancante",
                                        }
                                    }}
                                />
                            </AvForm>
                            
                        </ModalBody>
                        <ModalFooter>
                            <Button color='light' onClick={this.handleIndietro}>Torna al profilo</Button>
                            <Button color='primary' onClick={this.handleGetEntrate}>Visualizza entrate</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }
        else{
            return(
                <div>
                    <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Dettagli</ModalHeader>
                        <ModalBody style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
                            <div>
                                <h5>Guadagni: {this.state.entrate}</h5>
                                <h5>Tasse: {this.state.tasse}</h5>
                            </div>
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

export default BottoneRichiediEntrate;