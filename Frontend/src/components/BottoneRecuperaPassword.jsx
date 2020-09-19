import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import history from "../history";
import axios from "axios";
import { AvForm, AvField } from "availity-reactstrap-validation";

class BottoneRecuperaPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            email: '',
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

    handleRecuperaPassword = () => {
        axios
            .post(
                "/recuperoPassword",
                {
                    email: this.state.email,
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

    render() {
        return (
            <div>
                <h5>Hai smarrito la password?</h5>
                <Button color='#e9ecef' style={{ color: "#d9534f"}}  onClick={this.toggle}>{this.props.buttonLabel}Clicca qui per recuperarla</Button>
                <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>RECUPERA PASSWORD</ModalHeader>
                    <ModalBody>
                        <AvForm onValidSubmit={this.onValidSubmit}>
                            <AvField
                                autofocus
                                name="email"
                                type="text"
                                label="Inserisci l'email di cui non ricordi la password"
                                placeholder="@"
                                onChange={this.handleChange("email")}
                                errorMessage="Campo obbligatorio"
                                required
                            />
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='light' onClick={this.handleIndietro}>Torna al profilo</Button>
                        <Button color='primary' onClick={this.handleRecuperaPassword}>Applica modifiche</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default BottoneRecuperaPassword;
