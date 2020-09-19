import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Jumbotron, Container } from 'reactstrap';
import { AvForm, AvField} from "availity-reactstrap-validation";
import { FaFileUpload } from 'react-icons/fa';
import axios from "axios";

class BottoneUploadDocumenti extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            strongRegex: new RegExp("^[a-zA-Z]{6}[0-9]{2}[abcdehlmprstABCDEHLMPRST]{1}[0-9]{2}([a-zA-Z]{1}[0-9]{3})[a-zA-Z]{1}$"),
            cfValido: false
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

    analyze() {
        if (this.state.strongRegex.test(this.state.cf)) {
            localStorage.setItem("cfValido", true)
        }
        else {
            localStorage.setItem("cfValido", false)
            alert("FORMATO CODICE FISCALE ERRATO, RICONTROLLA")
        }
    }


    handleIndietro = () => {
        window.location.reload();
    };


    handleInvioDocumenti = () => {

        {this.analyze()};
        if(localStorage.getItem("cfValido")=="true"){
            axios
                .post(
                    "/inserisciOspite",
                    {
                        cf: this.state.cf,
                        nome: this.state.nome,
                        cognome: this.state.cognome,
                        idUtente: this.state.idUtente,
                        d_nascita: this.state.dataNascita,
                        d_inizio: this.props.d_inizio,
                        d_fine: this.props.d_fine,
                        ind_residenza: this.state.ind_residenza,
                        ref_prenotazione: this.props.ref_prenotazione
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
                        
                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
        }
    }

    render() {

        if(this.props.disabled==1){
            return (<Button disabled color='danger' onClick={this.toggle}>{this.props.buttonLabel}Carica documenti</Button>);
        }
        else{
            return (
                <div>
                    <Button color='danger' onClick={this.toggle}>{this.props.buttonLabel}Carica documenti</Button>
                    <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>CARICAMENTO DOCUMENTI</ModalHeader>
                        <ModalBody className="body">
                            <div className="panelloRegistrazione">
                                <br></br>
                                <div
                                    class="row h-100 justify-content-md-center"
                                    style={{ minHeight: "83vh" }}
                                >
                                    <div class="col-sm-12 col-md-8 col-lg-6 my-auto">
                                        <Jumbotron>
                                            <Container fluid>
                                                <center>
                                                    <h2 style={{ color: "black" }}>Caricamento documenti</h2>
                                                    <FaFileUpload color="black" size="200px" />
                                                </center>

                                                <AvForm onValidSubmit={this.onValidSubmit}>

                                                    <AvField
                                                        autofocus
                                                        name="nome"
                                                        type="text"
                                                        label="Nome"
                                                        placeholder="Es: Mario"
                                                        onChange={this.handleChange("nome")}
                                                        errorMessage="Non sembra tu abbia inserito un nome"
                                                        required
                                                    />


                                                    <AvField
                                                        autofocus
                                                        name="cognome"
                                                        type="text"
                                                        label="Cognome"
                                                        placeholder="Es: Rossi"
                                                        onChange={this.handleChange("cognome")}
                                                        errorMessage="Non sembra tu abbia inserito un cognome"
                                                        required
                                                    />

                                                    <AvField
                                                        autofocus
                                                        name="cf"
                                                        type="text"
                                                        label="Codice fiscale"
                                                        placeholder="Es: FRRMLD99H04G273I"
                                                        onChange={this.handleChange("cf")}
                                                        
                                                        required
                                                    />

                                                    <AvField
                                                        autofocus
                                                        name="ind_residenza"
                                                        type="text"
                                                        label="Comune di residenza"
                                                        placeholder="Es: Palermo"
                                                        onChange={this.handleChange("ind_residenza")}
                                                        required
                                                    />

                                                    <AvField
                                                        name="dataNascita"
                                                        onChange={this.handleChange("dataNascita")}
                                                        type="date"
                                                        
                                                        max={new Date().toJSON().slice(0, 10)}
                                                        onfocus="(this.type='date')"
                                                        label="Data di nascita"
                                                        errorMessage="Data non valida"
                                                        validate={{
                                                            required: {
                                                                value: true,
                                                                errorMessage: "Data mancante",
                                                            }
                                                        }}
                                                    />

                                                    <label>
                                                        Carica documento di riconoscimento
                                                        <br />

                                                        <input type="file" onChange={this.onChangeHandler} />

                                                    </label>
                                                    <br />
                                                </AvForm>
                                            </Container>

                                        </Jumbotron>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='light' onClick={this.handleIndietro}>Torna al profilo</Button>
                            <Button color='primary' onClick={this.handleInvioDocumenti}>Invia documenti</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }
    }
}

export default BottoneUploadDocumenti;
