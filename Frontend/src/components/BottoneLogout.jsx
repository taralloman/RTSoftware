import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import history from "../history";
import axios from "axios";

class BottoneLogout extends React.Component {
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
                "/logoutUtente",
                {
                    idUtente: localStorage.getItem("idUtente")
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
                    alert("Logout eseguito con successo!");
                    localStorage.removeItem(
                        "sessionValues",
                        JSON.stringify(res.data.session)
                    );
                    localStorage.removeItem(
                        "email",
                        JSON.stringify(res.data.email)
                    );
                    localStorage.removeItem(
                        "idUtente",
                        JSON.stringify(this.state.idUtente)
                    );
                    localStorage.removeItem(
                        "password",
                        JSON.stringify(res.data.password)
                    );
                    localStorage.removeItem(
                        "amministratore",
                        JSON.stringify(this.state.amministratore)
                    );
                    history.push("/");

                    window.location.reload();
                }
            });
    };

    handleAnnulla = () => {
        window.location.reload();
    };

    render() {
        return (
            <div>
                <Button color='danger' onClick={this.toggle}>{this.props.buttonLabel}Logout</Button>
                <Modal centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>LOGOUT</ModalHeader>
                    <ModalBody>
                        Sei sicuro di volere disconnettere il tuo account?
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

export default BottoneLogout;
