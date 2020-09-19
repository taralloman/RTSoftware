import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import history from "../history";
import axios from "axios";
import { AvForm, AvField } from "availity-reactstrap-validation";

class BottoneModificaUsername extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            email: localStorage.getItem("email"),
            idUtente: localStorage.getItem("idUtente"),
            amministratore: localStorage.getItem("amministratore"),
            nome: localStorage.getItem("nome"),
            cognome: localStorage.getItem("cognome")
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

    handleModificaProfilo = () => {
        axios
            .post(
                "/modificaProfilo",
                {
                    newEmail: this.state.newEmail,
                    email: localStorage.getItem("email"),
                    idUtente: this.state.idUtente,
                    nome: this.state.nome,
                    cognome: this.state.cognome, 
                    amministratore: this.state.amministratore
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            )
            .then((res) => {
                if (res.data.success == true) {
                    alert(res.data.message);
                    localStorage.setItem(
                        "sessionValues",
                        JSON.stringify(res.data.session)
                    );
                    localStorage.setItem(
                        "email",
                        this.state.newEmail
                    );
                    history.push("/");
                    window.location.reload();
                } else {
                    alert(res.data.message);
                }
            });
    }

    render() {
        return (
            <div>
                <Button color='danger' onClick={this.toggle}>{this.props.buttonLabel}Modifica</Button>
                <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>MODIFICA PROFILO</ModalHeader>
                    <ModalBody>
                        <AvForm onValidSubmit={this.onValidSubmit}>
                            <AvField
                                autofocus
                                name="nome"
                                type="nome"
                                label="Nome"
                                placeholder="Pippo"
                                onChange={this.handleChange("nome")}
                                errorMessage="Non sembra tu abbia inserito un nome"
                                required
                            />


                            <AvField
                                autofocus
                                name="cognome"
                                type="cognome"
                                label="Cognome"
                                placeholder="Baudo"
                                onChange={this.handleChange("cognome")}
                                errorMessage="Non sembra tu abbia inserito un cognome"
                                required
                            />


                            <AvField
                                autofocus
                                name="newEmail"
                                type="email"
                                label="Email"
                                placeholder="@"
                                onChange={this.handleChange("newEmail")}
                                errorMessage="Non sembra tu abbia inserito una mail"
                                required
                            />
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='light' onClick={this.handleIndietro}>Torna al profilo</Button>
                        <Button color='primary' onClick={this.handleModificaProfilo}>Applica modifiche</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default BottoneModificaUsername;
