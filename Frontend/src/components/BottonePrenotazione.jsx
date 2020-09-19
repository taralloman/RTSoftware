import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import history from "../history";
import axios from "axios";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";

class BottonePrenotazione extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            email: localStorage.getItem("email"),
            adultiDisabili: 0,
            bambiniDisabili: 0,
            n_singoleS: 0,
            n_doppieS: 0,
            n_tripleS: 0,
            n_quadrupleS: 0,
            richiestaC: 0
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
        history.push("/");
        window.location.reload();
    };

    handlePaga = () => {
        alert("Pagamento effettuato con successo")
        history.push("/");
        window.location.reload();
    };

    handlePagamento = () => {
        if(this.props.bnb==1){
            axios
                .post(
                    "/effettuaPrenotazione",
                    {
                        bnb: this.props.bnb,
                        checkin: this.props.dataArrivo,
                        checkout: this.props.dataPartenza,
                        importo:  ((this.props.nOspitiBambini - this.state.bambiniDisabili) * this.props.tassaRidotta) +
                            ((this.props.nOspitiAdulti - this.state.adultiDisabili) * this.props.tassaIntera) +
                            (this.state.n_singoleS * this.props.prezzo_singola) +
                            (this.state.n_doppieS * this.props.prezzo_doppia) +
                            (this.state.n_tripleS * this.props.prezzo_tripla) +
                            (this.state.n_quadrupleS * this.props.prezzo_quadrupla),
                        tasse: ((this.props.nOspitiBambini - this.state.bambiniDisabili) * this.props.tassaRidotta) +
                            ((this.props.nOspitiAdulti - this.state.adultiDisabili) * this.props.tassaIntera),
                        interiEsenti: this.state.adultiDisabili,
                        ridottiEsenti: this.state.bambiniDisabili,
                        idAlloggio: this.props.idAlloggio,
                        amministratore: localStorage.getItem("amministratore"),
                        idUtente: this.props.idUtente,
                        singoleRic: this.state.n_singoleS,
                        doppieRic: this.state.n_doppieS,
                        tripleRic: this.state.n_tripleS,
                        quadrupleRic: this.state.n_quadrupleS,
                        tipo_pagamento: this.props.tipoPagamento,
                        nInteri: this.props.nOspitiAdulti,
                        nRidotti: this.props.nOspitiBambini
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

                        if(this.props.tipoPagamento=="contanti"){
                            this.setState({ richiestaC: 1 });
                        }
                        else if (this.props.tipoPagamento=="online"){
                            this.setState({ richiestaC: 2 });
                        }else{
                            this.setState({ richiestaC: 3 });
                        }

                        
                        
                    } else {
                        alert(res.data.message);
                    }
                });
        }else{
            axios
                .post(
                    "/effettuaPrenotazione",
                    {
                        bnb: this.props.bnb,
                        checkin: this.props.dataArrivo,
                        checkout: this.props.dataPartenza,
                        importo: (this.props.prezzo) + ((this.props.nOspitiBambini - this.state.bambiniDisabili) * this.props.tassaRidotta) +
                            ((this.props.nOspitiAdulti - this.state.adultiDisabili) * this.props.tassaIntera),
                        tasse: ((this.props.nOspitiBambini - this.state.bambiniDisabili) * this.props.tassaRidotta) +
                            ((this.props.nOspitiAdulti - this.state.adultiDisabili) * this.props.tassaIntera),
                        interiEsenti: this.state.adultiDisabili,
                        ridottiEsenti: this.state.bambiniDisabili,
                        idAlloggio: this.props.idAlloggio,
                        amministratore: localStorage.getItem("amministratore"),
                        idUtente: this.props.idUtente,
                        singoleRic: this.state.n_singoleS,
                        doppieRic: this.state.n_doppieS,
                        tripleRic: this.state.n_tripleS,
                        quadrupleRic: this.state.n_quadrupleS,
                        tipo_pagamento: this.props.tipoPagamento,
                        nInteri: this.props.nOspitiAdulti,
                        nRidotti: this.props.nOspitiBambini
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

                        if (this.props.tipoPagamento == "contanti") {
                            this.setState({ richiestaC: 1 });
                        }
                        else if (this.props.tipoPagamento == "online") {
                            this.setState({ richiestaC: 2 });
                        } else {
                            this.setState({ richiestaC: 3 });
                        }
                    } else {
                        alert(res.data.message);
                    }
                });
        }
    }

    render() {
        if (localStorage.getItem("email") == null) {
            return (
                <div>
                    {history.push("/Login"),
                        window.location.reload()}
                </div>
            );
        }
        else{
            if(this.state.richiestaC==0){
                if(this.props.bnb==1){
                    return (
                        <div>
                            <Button color='danger' onClick={this.toggle}>{this.props.buttonLabel}Prenota</Button>
                            <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}><strong>PRENOTAZIONE</strong></ModalHeader>
                                <ModalBody>
                                    <AvForm onValidSubmit={this.onValidSubmit}>
                                        <div>
                                            <h5>DISABILI</h5>
                                            
                                            <AvField
                                                autofocus
                                                name="adultiDisabili"
                                                type="number"
                                                label="Numero adulti disabili"
                                                min="0"
                                                max={this.props.nOspitiAdulti}
                                                placeholder="Es: 0"
                                                onChange={this.handleChange("adultiDisabili")}
                                                errorMessage="Campo obbligatorio"
                                                required
                                            />
                                            
                                            <AvField
                                                autofocus
                                                name="bambiniDisabili"
                                                type="number"
                                                label="Numero bambini disabili"
                                                min="0"
                                                max={this.props.nOspitiBambini}
                                                placeholder="Es: 0"
                                                onChange={this.handleChange("bambiniDisabili")}
                                                errorMessage="Campo obbligatorio"
                                                required
                                            />
                                        </div>
                                        <br></br>
                                        <div>
                                            <h5>SELEZIONA CAMERE</h5>
                                            <br></br>
                                            <AvField
                                                autofocus
                                                name="n_singoleS"
                                                type="number"
                                                label="Numero stanze singole"
                                                min="0"
                                                max={this.props.n_singole}
                                                placeholder="Es: 1"
                                                onChange={this.handleChange("n_singoleS")}
                                                errorMessage="Campo obbligatorio"
                                                required
                                            />
                                            <AvField
                                                autofocus
                                                name="n_doppieS"
                                                type="number"
                                                label="Numero stanze doppie"
                                                min="0"
                                                max={this.props.n_doppie}
                                                placeholder="Es: 1"
                                                onChange={this.handleChange("n_doppieS")}
                                                errorMessage="Campo obbligatorio"
                                                required
                                            />
                                            <AvField
                                                autofocus
                                                name="n_tripleS"
                                                type="number"
                                                label="Numero stanze triple"
                                                min="0"
                                                max={this.props.n_triple}
                                                placeholder="Es: 1"
                                                onChange={this.handleChange("n_tripleS")}
                                                errorMessage="Campo obbligatorio"
                                                required
                                            />
                                            <AvField
                                                autofocus
                                                name="n_quadrupleS"
                                                type="number"
                                                label="Numero stanze quadruple"
                                                min="0"
                                                max={this.props.n_quadruple}
                                                placeholder="Es: 1"
                                                onChange={this.handleChange("n_quadrupleS")}
                                                errorMessage="Campo obbligatorio"
                                                required
                                            />
                                        </div>

                                    </AvForm>
                                </ModalBody>
                                <ModalFooter>
                                    <h5>
                                    TOTALE: 
                                    { ((this.props.nOspitiBambini - this.state.bambiniDisabili)*this.props.tassaRidotta)+
                                        ((this.props.nOspitiAdulti - this.state.adultiDisabili) * this.props.tassaIntera)+
                                        (this.state.n_singoleS * this.props.prezzo_singola)+
                                        (this.state.n_doppieS * this.props.prezzo_doppia)+
                                        (this.state.n_tripleS * this.props.prezzo_tripla)+
                                        (this.state.n_quadrupleS * this.props.prezzo_quadrupla)}€
                                    </h5>

                                    <Button color='light' onClick={this.handleIndietro}>Torna alla home</Button>
                                    <Button color='primary' onClick={this.handlePagamento}>Effettua pagamento</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    );
                }
                else{
                    return(
                        <div>
                            <Button color='danger' onClick={this.toggle}>{this.props.buttonLabel}Prenota</Button>
                            <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}><strong>PRENOTAZIONE</strong></ModalHeader>
                                <ModalBody>
                                    <AvForm onValidSubmit={this.onValidSubmit}>
                                        <div>
                                            <h5>DISABILI</h5>
                                            <AvField
                                                autofocus
                                                name="adultiDisabili"
                                                type="number"
                                                label="Numero adulti disabili"
                                                min="0"
                                                max={this.props.nOspitiAdulti}
                                                placeholder="Es: 0"
                                                onChange={this.handleChange("adultiDisabili")}
                                                errorMessage="Campo obbligatorio"
                                                required
                                            />

                                            <AvField
                                                autofocus
                                                name="bambiniDisabili"
                                                type="number"
                                                label="Numero bambini disabili"
                                                min="0"
                                                max={this.props.nOspitiBambini}
                                                placeholder="Es: 0"
                                                onChange={this.handleChange("bambiniDisabili")}
                                                errorMessage="Campo obbligatorio"
                                                required
                                            />
                                        </div>
                                        <br></br>

                                    </AvForm>
                                </ModalBody>
                                <ModalFooter>
                                    <h5>
                                    TOTALE: {(this.props.prezzo) + ((this.props.nOspitiBambini - this.state.bambiniDisabili) * this.props.tassaRidotta) +
                                        ((this.props.nOspitiAdulti - this.state.adultiDisabili) * this.props.tassaIntera)}€</h5>
                                    <Button color='light' onClick={this.handleIndietro}>Torna alla home</Button>
                                    <Button color='primary' onClick={this.handlePagamento}>Effettua pagamento</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    );
                }
            }else if(this.state.richiestaC==1){
                return(
                    <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}><strong>PAGAMENTO IN CONTANTI</strong></ModalHeader>
                        <ModalBody>
                            <h5>Il pagamento avverrà in loco</h5>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='light' onClick={this.handleIndietro}>Torna alla home</Button>
                        </ModalFooter>
                    </Modal>
                );
            }else if(this.state.richiestaC==2){
                return (
                    <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}><strong>PAGAMENTO ONLINE</strong></ModalHeader>
                        <ModalBody>
                            <h5>Il pagamento è stato effettuato</h5>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='light' onClick={this.handleIndietro}>Torna alla home</Button>
                        </ModalFooter>
                    </Modal>
                );
            }else{
                return (
                    <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}><strong>PAGAMENTO ONLINE/CONTANTI</strong></ModalHeader>
                        <ModalBody>
                        <AvForm>
                            <span>Segli il metodo di pagamento</span>
                            <AvRadioGroup inline name="tipoPagamento" required errorMessage="Non sembra tu abbia inserito un tipo di pagamento" >
                                <AvRadio label="Pagamento online" value="online" />
                                <AvRadio label="Pagamento in contanti" value="contanti" />
                            </AvRadioGroup>
                        </AvForm>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='light' onClick={this.handleIndietro}>Torna alla home</Button>
                            <Button color='primary' onClick={this.handlePaga}>Paga</Button>
                        </ModalFooter>
                    </Modal>
                );
            }
        }
    }
}

export default BottonePrenotazione;
