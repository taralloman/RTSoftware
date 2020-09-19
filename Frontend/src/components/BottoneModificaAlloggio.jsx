import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Jumbotron, Container } from 'reactstrap';
import { AvForm, AvField } from "availity-reactstrap-validation";
import { FaHome } from 'react-icons/fa';
import history from "../history";
import axios from "axios";


class BottoneModificaAlloggio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            bnb: this.props.bnb,
            idAlloggio: this.props.idAlloggio,
            nomeAlloggio: this.props.nome_alloggio,
            descrizione: this.props.descrizione,
            tassaIntera: this.props.tassa_intera,
            tassaRidotta: this.props.tassa_ridotta,
            prezzo: this.props.prezzo,
            regione: "Campania",
            tipoPagamento: 'Online',
            refComune: this.props.ref_comune,
            indirizzo: this.props.indirizzo,
            nBagni: this.props.n_bagni,
            postiLetto: this.props.posti_letto,            
            prezzoSingola: this.props.prezzo_singola,
            prezzoDoppia: this.props.prezzo_doppia,
            prezzoTripla: this.props.prezzo_tripla,
            prezzoQuadrupla: this.props.prezzo_quadrupla,
            nSingole: this.props.n_singole,
            nDoppie: this.props.n_doppie,
            nTriple: this.props.n_triple,
            nQuadruple: this.props.n_quadruple,
            //foto: this.props.foto
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

    handleIndietro = () => {
        window.location.reload();
    };


    onValidSubmit = (event) => {
        if(this.state.bnb=="1"){

            axios
                .post(
                    "/modificaAlloggio",
                    {

                        bnb: this.state.bnb,
                        idAlloggio: this.state.idAlloggio,
                        idUtente: localStorage.getItem("idUtente"),
                        amministratore: localStorage.getItem("amministratore"),
                        nomeAlloggio: this.state.nomeAlloggio,
                        descrizione: this.state.descrizione,
                        tassaIntera: this.state.tassaIntera,
                        tassaRidotta: this.state.tassaRidotta,

                        prezzoSingola: this.state.prezzoSingola,
                        prezzoDoppia: this.state.prezzoDoppia,
                        prezzoTripla: this.state.prezzoTripla,
                        prezzoQuadrupla: this.state.prezzoQuadrupla,

                        regione: "Campania",
                        tipoPagamento: "Online",
                        refComune: this.state.refComune,
                        indirizzo: this.state.indirizzo,
                        nSingole: this.state.nSingole,
                        nDoppie: this.state.nDoppie,
                        nTriple: this.state.nTriple,
                        nQuadruple: this.state.nQuadruple
                        //foto: this.state.foto

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
                        
                        localStorage.setItem("idAlloggio", this.state.idAlloggio);
                        localStorage.setItem("nomeAlloggio", this.state.nomeAlloggio);
                        localStorage.setItem("descrizione", this.state.descrizione);
                        localStorage.setItem("tassaIntera", this.state.tassaIntera);
                        localStorage.setItem("tassaRidotta", this.state.tassaRidotta);
                        localStorage.setItem("refComune", this.state.refComune);
                        localStorage.setItem("refRegione", this.state.refRegione);
                        localStorage.setItem("indirizzo", this.state.indirizzo);
                        localStorage.setItem("tipoPagamento", this.state.tipoPagamento);
                        localStorage.setItem("prezzoSingola", this.state.prezzoSingola);
                        localStorage.setItem("prezzoDoppia", this.state.prezzoDoppia);
                        localStorage.setItem("prezzoTripla", this.state.prezzoTripla);
                        localStorage.setItem("prezzoQuadrupla", this.state.prezzoQuadrupla);
                        localStorage.setItem("nSingole", this.state.nSingole);
                        localStorage.setItem("nDoppie", this.state.nDoppie);
                        localStorage.setItem("nTriple", this.state.nTriple);
                        localStorage.setItem("nQuadruple", this.state.nQuadruple);
                        localStorage.setItem("fotoImmobile", this.state.fotoImmobile);

                        history.push("/");
                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
        } else
            {
            axios
                .post(
                    "/modificaAlloggio",
                    {
                        idAlloggio: this.state.idAlloggio,
                        bnb: this.state.bnb,
                        idUtente: localStorage.getItem("idUtente"),
                        amministratore: localStorage.getItem("amministratore"),
                        nomeAlloggio: this.state.nomeAlloggio,
                        descrizione: this.state.descrizione,
                        tassaIntera: this.state.tassaIntera,
                        tassaRidotta: this.state.tassaRidotta,
                        prezzo: this.state.prezzo,
                        regione: "Campania",
                        tipoPagamento: "online",
                        refComune: this.state.refComune,
                        indirizzo: this.state.indirizzo,
                        nBagni: this.state.nBagni,
                        postiLetto: this.state.postiLetto
                        //file: this.state.foto

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

                        localStorage.setItem("idAlloggio", this.state.idAlloggio);
                        localStorage.setItem("nomeAlloggio", this.state.nomeAlloggio);
                        localStorage.setItem("descrizione", this.state.descrizione);
                        localStorage.setItem("tassaIntera", this.state.tassaIntera);
                        localStorage.setItem("tassaRidotta", this.state.tassaRidotta);
                        localStorage.setItem("refComune", this.state.refComune);
                        localStorage.setItem("refRegione", this.state.refRegione);
                        localStorage.setItem("indirizzo", this.state.indirizzo);
                        localStorage.setItem("tipoPagamento", this.state.tipoPagamento);
                        localStorage.setItem("prezzo", this.state.prezzo);
                        localStorage.setItem("nBagni", this.state.nBagni);
                        localStorage.setItem("postiLetto", this.state.postiLetto);
                        localStorage.setItem("fotoImmobile", this.state.fotoImmobile);

                        history.push("/");
                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
            }
    }

    render() {
        const defaultValues0 = {

            nomeAlloggio: this.props.nome_alloggio,
            descrizione: this.props.descrizione,
            tassaIntera: this.props.tassa_intera,
            tassaRidotta: this.props.tassa_ridotta,
            prezzo: this.props.prezzo,
            regione: "Campania",
            refComune: this.props.ref_comune,
            indirizzo: this.props.indirizzo,
            nBagni: this.props.n_bagni,
            postiLetto: this.props.posti_letto,
            file: this.props.foto
        };

        const defaultValues1 = {
            nomeAlloggio: this.props.nome_alloggio,
            descrizione: this.props.descrizione,
            tassaIntera: this.props.tassa_intera,
            tassaRidotta: this.props.tassa_ridotta,
            prezzoSingola: this.props.prezzo_singola,
            prezzoDoppia: this.props.prezzo_doppia,
            prezzoTripla: this.props.prezzo_tripla,
            prezzoQuadrupla: this.props.prezzo_quadrupla,
            regione: "Campania",
            refComune: this.props.ref_comune,
            indirizzo: this.props.indirizzo,
            nSingole: this.props.n_singole,
            nDoppie: this.props.n_doppie,
            nTriple: this.props.n_triple,
            nQuadruple: this.props.n_quadruple,
            file: this.props.foto

        };

        if (this.state.bnb == "cv") {
            return (
                <div>
                    <Button color='danger' onClick={this.toggle}>Modifica alloggio</Button>
                    <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>MODIFICA ALLOGGIO</ModalHeader>
                        <ModalBody className="body">
                            <div
                                class="row h-100 justify-content-md-center"
                                style={{ minHeight: "83vh" }}
                            >
                                <div class="col-sm-12 col-md-8 col-lg-6 my-auto">
                                    <Jumbotron>
                                        <Container fluid>
                                            <center>
                                                <h2 style={{ color: "black" }}>Modifica B&B</h2>
                                                <FaHome color="black" size="200px" />
                                            </center>

                                            <AvForm onValidSubmit={this.onValidSubmit} model={defaultValues1}>

                                                <AvField
                                                    autofocus
                                                    name="nomeAlloggio"
                                                    type="text"
                                                    label="Nome dell'Alloggio"
                                                    onChange={this.handleChange("nomeAlloggio")}
                                                    errorMessage="Non sembra tu abbia inserito un nome"
                                                    required
                                                />


                                                <AvField
                                                    autofocus
                                                    name="descrizione"
                                                    type="text"
                                                    label="Descrizione dell'immobile"
                                                    onChange={this.handleChange("descrizione")}
                                                    errorMessage="Non sembra tu abbia inserito una descrizione"
                                                    required
                                                />


                                                <AvField
                                                    autofocus
                                                    name="tassaIntera"
                                                    type="number"
                                                    step="0.01"
                                                    min="0.00"
                                                    label="Importo Tassa Intera"
                                                    onChange={this.handleChange("tassaIntera")}
                                                    errorMessage="Inserisci il numero correttamente es. 235,00"
                                                    required
                                                />

                                                <AvField
                                                    name="tassaRidotta"
                                                    type="number"
                                                    step="0.01"
                                                    min="0.00"
                                                    label="Importo Tassa Ridotta"
                                                    onChange={this.handleChange("tassaRidotta")}
                                                    errorMessage="Inserisci il numero correttamente es. 235,00"
                                                    required
                                                />

                                                <AvField
                                                    name="prezzoSingola"
                                                    type="number"
                                                    step="0.01"
                                                    min="0.00"
                                                    label="Prezzo a notte stanza singola (in euro)"
                                                    onChange={this.handleChange("prezzoSingola")}
                                                    errorMessage="Inserisci il numero correttamente es. 235,00"
                                                    required
                                                />

                                                <AvField
                                                    name="prezzoDoppia"
                                                    type="number"
                                                    step="0.01"
                                                    min="0.00"
                                                    label="Prezzo a notte stanza doppia (in euro)"
                                                    onChange={this.handleChange("prezzoDoppia")}
                                                    errorMessage="Inserisci il numero correttamente es. 235,00"
                                                    required
                                                />

                                                <AvField
                                                    name="prezzoTripla"
                                                    type="number"
                                                    step="0.01"
                                                    min="0.00"
                                                    label="Prezzo a notte stanza tripla (in euro)"
                                                    onChange={this.handleChange("prezzoTripla")}
                                                    errorMessage="Inserisci il numero correttamente es. 235,00"
                                                    required
                                                />

                                                <AvField
                                                    name="prezzoQuadrupla"
                                                    type="number"
                                                    step="0.01"
                                                    min="0.00"
                                                    label="Prezzo a notte stanza quadrupla (in euro)"
                                                    onChange={this.handleChange("prezzoQuadrupla")}
                                                    errorMessage="Inserisci il numero correttamente es. 235,00"
                                                    required
                                                />

                                                <AvField
                                                    autofocus
                                                    name="regione"
                                                    type="text"
                                                    label="Regione dove è situato l'immobile"
                                                    onChange={this.handleChange("regione")}
                                                    errorMessage="Non sembra tu abbia inserito una regione"
                                                    required
                                                />

                                                <AvField
                                                    autofocus
                                                    name="refComune"
                                                    type="text"
                                                    label="Comune dove è situato l'immobile"
                                                    onChange={this.handleChange("refComune")}
                                                    errorMessage="Non sembra tu abbia inserito un comune"
                                                    required
                                                />

                                                <AvField
                                                    autofocus
                                                    name="indirizzo"
                                                    type="text"
                                                    label="Indirizzo dell'immobile"
                                                    onChange={this.handleChange("indirizzo")}
                                                    errorMessage="Non sembra tu abbia inserito un indirizzo"
                                                    required
                                                />

                                                <AvField type="select" name="nSingole" label="Numero di singole" onChange={this.handleChange("nSingole")}>
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                    <option>10</option>
                                                    <option>11</option>
                                                    <option>12</option>
                                                    <option>13</option>
                                                    <option>14</option>
                                                </AvField>

                                                <AvField type="select" name="nDoppie" label="Numero di doppie" onChange={this.handleChange("nDoppie")}>
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                    <option>10</option>
                                                    <option>11</option>
                                                    <option>12</option>
                                                    <option>13</option>
                                                    <option>14</option>
                                                </AvField>

                                                <AvField type="select" name="nTriple" label="Numero di triple" onChange={this.handleChange("Triple")} >
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                    <option>10</option>
                                                    <option>11</option>
                                                    <option>12</option>
                                                    <option>13</option>
                                                    <option>14</option>
                                                </AvField>

                                                <AvField type="select" name="nQuadruple" label="Numero di quadruple" onChange={this.handleChange("nQuadruple")} defaultValues0>
                                                    <option>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                    <option>10</option>
                                                    <option>11</option>
                                                    <option>12</option>
                                                    <option>13</option>
                                                    <option>14</option>
                                                </AvField>

                                                <label>
                                                    Seleziona foto (facoltativo)
                                                        <br />
                                                    <input type="file" onChange={this.handleChange("file")} />
                                                </label>


                                            <center>
                                                <Button type="submit" color="danger">
                                                    Cambia i dati
                                                </Button>
                                            </center>
                                            <br />
                                        </AvForm>
                                    </Container>

                                </Jumbotron>
                            </div>
                        </div>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
        else {
            return (
                <div>

                    <Button color='danger' onClick={this.toggle}>Modifica alloggio</Button>
                    <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>MODIFICA ALLOGGIO</ModalHeader>
                        <ModalBody className="body">
                            <div
                                class="row h-100 justify-content-md-center"
                                style={{ minHeight: "83vh" }}
                            >
                                <div class="col-sm-12 col-md-8 col-lg-6 my-auto">
                                    <Jumbotron>
                                        <Container fluid>
                                            <center>
                                                <h2 style={{ color: "black" }}>Modifica casa vacanze</h2>
                                                <FaHome color="black" size="200px" />
                                            </center>

                                            <AvForm onValidSubmit={this.onValidSubmit} model={defaultValues0}>

                                                <AvField
                                                    autofocus
                                                    name="nomeAlloggio"
                                                    type="text"
                                                    label="Nome dell'Alloggio"
                                                    onChange={this.handleChange("nomeAlloggio")}
                                                    errorMessage="Non sembra tu abbia inserito un nome"
                                                    required
                                                />


                                                <AvField
                                                    autofocus
                                                    name="descrizione"
                                                    type="text"
                                                    label="Descrizione dell'immobile"
                                                    onChange={this.handleChange("descrizione")}
                                                    errorMessage="Non sembra tu abbia inserito una descrizione"
                                                    required
                                                />


                                                <AvField
                                                    autofocus
                                                    name="tassaIntera"
                                                    type="number"
                                                    step="0.01"
                                                    min="0.00"
                                                    label="Importo Tassa Intera (in euro)"
                                                    onChange={this.handleChange("tassaIntera")}
                                                    errorMessage="Inserisci il numero correttamente es. 235,00"
                                                    required
                                                />

                                                <AvField
                                                    name="tassaRidotta"
                                                    type="number"
                                                    step="0.01"
                                                    min="0.00"
                                                    label="Importo Tassa Ridotta (in euro)"
                                                    onChange={this.handleChange("tassaRidotta")}
                                                    errorMessage="Inserisci il numero correttamente es. 235,00"
                                                    required
                                                />

                                                <AvField
                                                    name="prezzo"
                                                    type="number"
                                                    step="0.01"
                                                    min="0.00"
                                                    label="Prezzo a notte (in euro)"
                                                    onChange={this.handleChange("prezzo")}
                                                    errorMessage="Inserisci il numero correttamente es. 235,00"
                                                    required
                                                />


                                                <AvField
                                                    autofocus
                                                    name="regione"
                                                    type="text"
                                                    label="Regione dove è situato l'immobile"
                                                    onChange={this.handleChange("regione")}
                                                    errorMessage="Non sembra tu abbia inserito una regione"
                                                    required
                                                />

                                                <AvField
                                                    autofocus
                                                    name="refComune"
                                                    type="text"
                                                    label="Comune dove è situato l'immobile"
                                                    onChange={this.handleChange("refComune")}
                                                    errorMessage="Non sembra tu abbia inserito un comune"
                                                    required
                                                />

                                                <AvField
                                                    autofocus
                                                    name="indirizzo"
                                                    type="text"
                                                    label="Indirizzo dell'immobile"
                                                    onChange={this.handleChange("indirizzo")}
                                                    errorMessage="Non sembra tu abbia inserito un indirizzo"
                                                    required
                                                />

                                                <AvField type="select" name="nBagni" label="Numero di Bagni disponibili" onChange={this.handleChange("nBagni")}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4+</option>
                                                </AvField>

                                                <AvField type="select" name="postiLetto" label="Posti Letto" onChange={this.handleChange("postiLetto")}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4+</option>
                                                </AvField>

                                                <label>
                                                    Seleziona foto (facoltativo)
                                                        <br />
                                                    <input type="file" onChange={this.handleChange("file")} />
                                                </label>


                                            <center>
                                                <Button type="submit" color="danger">
                                                    Cambia i dati
                                                </Button>
                                            </center>
                                            <br />
                                        </AvForm>
                                    </Container>

                                </Jumbotron>
                            </div>
                        </div>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }
    }
}

export default BottoneModificaAlloggio;