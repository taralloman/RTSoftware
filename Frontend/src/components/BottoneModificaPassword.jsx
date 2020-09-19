import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import history from "../history";

import axios from "axios";

import { AvForm, AvField } from "availity-reactstrap-validation";

class BottoneModificaPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            email: localStorage.getItem("email"),
            oldPassword: "",
            newPassword: "",
            cNewPassword: "",
            strongRegex: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),
            passwordvalida: false
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


    analyze() {
        if (this.state.strongRegex.test(this.state.newPassword)) {
            this.setState({ passwordvalida: true });
            alert("Password sicura")
        }
        else {
            this.setState({ passwordvalida: false });
            alert("Ricordati che la password deve avere almeno 8 caratteri, almeno una maiuscola, almeno una minuscola e un carattere speciale tra !@#$%^&")
        }
    }

    handleModificaPassword = () => {
        { this.analyze() }
        if (this.state.passwordvalida) {
            axios
                .post(
                    "/modificaPassword",
                    {
                        email: this.state.email,
                        oldPassword: localStorage.getItem("password"),
                        newPassword: this.state.newPassword,
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

                        history.push("/");
                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
        }
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
                                name="oldPassword"
                                type="password"
                                label="Attuale password"
                                placeholder="*"
                                onChange={this.handleChange("oldPassword")}
                                errorMessage="Campo obbligatorio"
                                required
                            />

                            <AvField
                                autofocus
                                name="newPassword"
                                type="password"
                                label="Nuova password"
                                placeholder="*"
                                onChange={this.handleChange("newPassword")}
                                errorMessage="Campo obbligatorio"
                                required
                            />
                            <AvField
                                autofocus
                                name="cNewPassword"
                                type="password"
                                label="Ripeti password"
                                placeholder="*"
                                onChange={this.handleChange("cNewPassword")}
                                errorMessage="Campo obbligatorio"
                                required
                            />

                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='light' onClick={this.handleIndietro}>Torna al profilo</Button>
                        <Button color='primary' onClick={this.handleModificaPassword}>Applica modifiche</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default BottoneModificaPassword;