import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import history from "../history";
import axios from "axios";

class BottoneEliminaAlloggio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleIndietro = () => {
        window.location.reload();
    };

    handleElimina = () =>{
        axios
            .post(
                "/eliminaAlloggio",
                {
                    idAlloggio: this.props.idAlloggio
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
                    localStorage.removeItem("idAlloggio");
                    history.push("/");
                    window.location.reload();
                } else {
                    alert(res.data.message);
                    window.location.reload();
                }
            });
    }

    render() {
        return (
            <div>
                <Button color='danger' onClick={this.toggle}>{this.props.buttonLabel}Elimina alloggio</Button>
                <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>ELIMINA ALLOGGIO</ModalHeader>
                    <ModalBody>
                        Sei sicuro di voler eliminare l'alloggio selezionato?
                    </ModalBody>
                    <ModalFooter>
                        <Button color='light' onClick={this.handleIndietro}>Annulla</Button>
                        <Button color='primary' onClick={this.handleElimina}>Elimina</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default BottoneEliminaAlloggio;
