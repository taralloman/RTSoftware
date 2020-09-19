import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import axios from 'axios';
import BottoneVisualizzaAlloggioHost from './BottoneVisualizzaAlloggioHost';

class BottoneGestioneAccountProprietari extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idUtente: localStorage.getItem("idUtente"),
            modal: false,
            email: "",
            isLoading: false,
            immobile: null
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
                "/",
                {

                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            )
            .then((res) => {
                if (res.data.success) {
                    this.setState({ immobili: JSON.parse(JSON.stringify(res.data.data2)) });
                    this.setState({ isLoading: false })
                    //alert(JSON.stringify(res.data.data2))	

                }
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
        if (this.state.immobile != null) {
            localStorage.setItem("id_alloggio", this.state.immobile);
        }
        if (this.state.isLoading) {
            return (<div></div>)
        }
        else {

            return (
                <div>
                    <Button color='danger' onClick={this.toggle}>Vai</Button>
                    <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>LISTA IMMOBILI</ModalHeader>
                        <ModalBody style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <td>
                                        <strong><td>#</td></strong>

                                        <tr><strong>Nome alloggio</strong>
                                            {this.state.immobili.map(immobile => <td>{immobile.nome_alloggio}</td>)}
                                        </tr>
                                        <tr><strong>Tipo alloggio</strong> (0=Casa Vacanze, 1=BnB)
                                    {this.state.immobili.map(immobile => <td>{immobile.bnb}</td>)}
                                        </tr>
                                        <tr><strong>Comune</strong>
                                            {this.state.immobili.map(immobile => <td>{immobile.ref_comune}</td>)}
                                        </tr>
                                        <tr>
                                            <br></br>
                                            {this.state.immobili.map(immobile => <td><BottoneVisualizzaAlloggioHost idAlloggio={immobile.id_alloggio} /></td>)}
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
        }
    }
}
export default BottoneGestioneAccountProprietari; 