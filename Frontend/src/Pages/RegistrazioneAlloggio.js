import React, {  Component } from 'react';
import { Jumbotron, Container, Button } from "reactstrap";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import { FaHome } from 'react-icons/fa';

import history from "../history";

import '../assets/css/CSSN.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';


import Header from '../components/Header';
import Footer from '../components/Footer';


import axios from "axios";

class RegistrazioneAlloggio extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    
    state = {
        idUtente: localStorage.getItem("idUtente"),
        tipoAlloggio: 0,
        amministratore: localStorage.getItem("amministratore"),
        tassaIntera: null,
        tassaRidotta: null,
        indirizzo: "",
        prezzo: null,
        nBagni: "1",
        postiLetto: "1",
        tipoPagamento: null,
        refComune: null,
        regione: null,
        nSingole: "0",
        nDoppie: "0",
        nTriple: "0",
        nQuadruple: "0",
        prezzoSingola: null,
        prezzoDoppia: null,
        prezzoTripla: null,
        prezzoQuadrupla: null,
        foto: null,
        loaded:""
    };


    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value 
        });
    };

    onChangeHandler = (event) => {
        console.log(event.target.files[0])
        this.setState({
            foto: event.target.files[0],
            loaded: 0,
        });
    };
    

    onValidSubmit = (event) => {
        event.preventDefault();
        if ( this.state.tipoAlloggio==0) {
            const formData = new FormData();
            formData.append("nomeAlloggio", this.state.nomeAlloggio);
            formData.append("idUtente", this.state.idUtente);
            formData.append("descrizione", this.state.descrizione);
            formData.append("tassaIntera", this.state.importoTI);
            formData.append("tassaRidotta", this.state.importoTR);
            formData.append("refComune", this.state.comune);
            formData.append("indirizzo", this.state.indirizzo);
            formData.append("bnb", this.state.tipoAlloggio);
            formData.append("tipoPagamento", this.state.tipoPagamento);
            formData.append("prezzo", this.state.prezzo);
            formData.append("nBagni", this.state.nBagni);
            formData.append("postiLetto", this.state.postiLetto);
            formData.append("amministratore", this.state.amministratore);
            formData.append("foto", this.state.foto);


            axios
                .post(
                    "/inserisciAlloggio", formData
                    ,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
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
        } else 
            {
                const formData = new FormData();
                formData.append("nomeAlloggio", this.state.nomeAlloggio);
                formData.append("idUtente", this.state.idUtente);
                formData.append("descrizione", this.state.descrizione);
                formData.append("tassaIntera", this.state.importoTI);
                formData.append("tassaRidotta", this.state.importoTR);
                formData.append("refComune", this.state.comune);
                formData.append("indirizzo", this.state.indirizzo);
                formData.append("bnb", this.state.tipoAlloggio);
                formData.append("tipoPagamento", this.state.tipoPagamento);
                formData.append("nSingole", this.state.nSingole);
                formData.append("nDoppie", this.state.nDoppie);
                formData.append("nTriple", this.state.nTriple);
                formData.append("nQuadruple", this.state.nQuadruple);
                formData.append("prezzoSingola", this.state.prezzoSingola);
                formData.append("prezzoDoppia", this.state.prezzoDoppia);
                formData.append("prezzoTripla", this.state.prezzoTripla);
                formData.append("prezzoQuadrupla", this.state.prezzoQuadrupla);      
                formData.append("amministratore", this.state.amministratore);
                formData.append("foto", this.state.foto);
                    axios
                    .post(
                        "/inserisciAlloggio", formData
                        ,
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
    };

    render() {

        const defaultValues0 = {
            tipoAlloggio: '0'
        };

        const defaultValues1 = {
            tipoAlloggio: '1'
        };

        if (localStorage.getItem("email") == null){
            return(
                <div>
                    {history.push("/Login"),
                    window.location.reload()}
                </div>
            );
        }else
            {
                if(this.state.tipoAlloggio==0)
                {
                    return (
                        <div>
                            <Header />
                            <div className="panelloRegistrazione body">
                                <br></br>
                                <div
                                    class="row h-100 justify-content-md-center"
                                    style={{ minHeight: "83vh" }}
                                >
                                    <div class="col-sm-12 col-md-8 col-lg-6 my-auto">
                                        <Jumbotron>
                                            <Container fluid>
                                                <center>
                                                    <h2 style={{ color: "black" }}>Registrazione alloggio</h2>
                                                    <FaHome color="black" size="200px" />
                                                </center>

                                                <AvForm onValidSubmit={this.onValidSubmit} model={defaultValues0}>
                                                    <label for="tipoAlloggio"> Che tipo di annuncio è? </label>
                                                    <AvRadioGroup inline name="tipoAlloggio" required errorMessage="Non sembra tu abbia inserito che tipo di alloggio sia" >
                                                    <AvRadio label="Casa Vacanze" value="0" onChange={this.handleChange("tipoAlloggio")} />
                                                    <AvRadio label="BnB" value="1" onChange={this.handleChange("tipoAlloggio")}  />
                                                    </AvRadioGroup>
                                                    <AvField
                                                        autofocus
                                                        name="nomeAlloggio"
                                                        type="text"
                                                        label="Nome dell'Alloggio"
                                                        placeholder="Palazzo Verde"
                                                        onChange={this.handleChange("nomeAlloggio")}
                                                        errorMessage="Non sembra tu abbia inserito un nome"
                                                        required
                                                    />


                                                    <AvField
                                                        autofocus
                                                        name="descrizione"
                                                        type="text"
                                                        label="Descrizione dell'immobile"
                                                        placeholder="Inserire una piccola descrzione dell'immobile come servizi e/o luoghi di interesse turistico"
                                                        onChange={this.handleChange("descrizione")}
                                                        errorMessage="Non sembra tu abbia inserito una descrizione"
                                                        required
                                                    />


                                                    <AvField
                                                        autofocus
                                                        name="importoTI"
                                                        type="number"
                                                        step="0.01"
                                                        min="0.00"
                                                        label="Importo Tassa Intera (in euro)"
                                                        placeholder="50.00"
                                                        onChange={this.handleChange("importoTI")}
                                                        errorMessage="Inserisci il numero correttamente es. 235,00"
                                                        required
                                                    />

                                                    <AvField
                                                        name="importoTR"
                                                        type="number"
                                                        step="0.01"
                                                        min="0.00"
                                                        label="Importo Tassa Ridotta (in euro)"
                                                        placeholder="25.00"
                                                        onChange={this.handleChange("importoTR")}
                                                        errorMessage="Inserisci il numero correttamente es. 235,00"
                                                        required
                                                    /> 
                                                    
                                                    <label for="tipoPagamento">Che tipo di pagaento si accetta?</label>
                                                    <AvRadioGroup inline name="tipoPagamento" required errorMessage="Non sembra tu abbia inserito un tipo di pagamento" >
                                                        <AvRadio label="Pagamento online" value="online" onChange={this.handleChange("tipoPagamento")} />
                                                        <AvRadio label="Pagamento in contanti" value="contanti" onChange={this.handleChange("tipoPagamento")} />
                                                        <AvRadio label="Pagamento online/Pagamento in contanti" value="entrambi" onChange={this.handleChange("tipoPagamento")} />
                                                    </AvRadioGroup>

                                                    <AvField 
                                                        name="prezzo"
                                                        type="number"
                                                        step="0.01"
                                                        min="0.00"
                                                        label="Prezzo a notte (in euro)"
                                                        placeholder="100.00"
                                                        onChange={this.handleChange("prezzo")}
                                                        errorMessage="Inserisci il numero correttamente es. 235,00"
                                                        required
                                                    />

                                                    <span>Comune</span>
                                                    <AvField required type="select" name="comune" onChange={this.handleChange("comune")}>
                                                        <option>Seleziona...</option>
                                                        <option value="Palermo">Palermo</option>
                                                        <option value="Roma">Roma</option>
                                                        <option value="Milano">Milano</option>
                                                        <option value="Catania">Catania</option>
                                                        <option value="Napoli">Napoli</option>
                                                    </AvField>

                                                    <AvField
                                                        autofocus
                                                        name="indirizzo"
                                                        type="text"
                                                        label="Indirizzo dell'immobile"
                                                        placeholder="Viale Michelangelo"
                                                        onChange={this.handleChange("indirizzo")}
                                                        errorMessage="Non sembra tu abbia inserito un indirizzo"
                                                        required
                                                    />
                                                    
                                                    <AvField type="select"  name="nBagni" label="Numero di Bagni disponibili" onChange={this.handleChange("nBagni")}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4+</option>         
                                                    </AvField>

                                                    <AvField type="select"  name="postiLetto" label="Posti Letto" onChange={this.handleChange("postiLetto")}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4+</option>
                                                    </AvField>
                                                    
                                                    <AvField
                                                        type="file"
                                                        label="Inserisci una foto dell'immobile"
                                                        name="foto"
                                                        onChange={this.onChangeHandler}
                                                        errorMessage="Campo non valido"
                                                        required
                                                    />          
                                                    
                                                    <center>
                                                        <Button type="submit" color="danger">
                                                            Registra
                                                        </Button>
                                                    </center>
                                                    <br />
                                                </AvForm>
                                            </Container>

                                        </Jumbotron>
                                    </div>
                                </div>
                            </div>

                            <Footer />
                        </div>
                    );
                }
                else
                {
                    return (
                        <div>                            
                            <Header />
                            <div className="panelloRegistrazione body">
                                <br></br>
                                <div
                                    class="row h-100 justify-content-md-center"
                                    style={{ minHeight: "83vh" }}
                                >
                                    <div class="col-sm-12 col-md-8 col-lg-6 my-auto">
                                        <Jumbotron>
                                            <Container fluid>
                                                <center>
                                                    <h2 style={{ color: "black" }}>Registrazione</h2>
                                                    <FaHome color="black" size="200px" />
                                                </center>

                                                <AvForm onValidSubmit={this.onValidSubmit} model={defaultValues1}>



                                                    <label for="tipoAlloggio"> Che tipo di annuncio è? </label>
                                                    <AvRadioGroup inline name="tipoAlloggio" required errorMessage="Non sembra tu abbia inserito che tipo di alloggio sia" >
                                                    <AvRadio label="Casa Vacanze" value="0" onChange={this.handleChange("tipoAlloggio")} />
                                                    <AvRadio label="BnB" value="1" onChange={this.handleChange("tipoAlloggio")} />
                                                    </AvRadioGroup>
                                                    <AvField
                                                        autofocus
                                                        name="nomeAlloggio"
                                                        type="text"
                                                        label="Nome dell'Alloggio"
                                                        placeholder="Palazzo Verde"
                                                        onChange={this.handleChange("nomeAlloggio")}
                                                        errorMessage="Non sembra tu abbia inserito un nome"
                                                        required
                                                    />


                                                    <AvField
                                                        autofocus
                                                        name="descrizione"
                                                        type="text"
                                                        label="Descrizione dell'immobile"
                                                        placeholder="Inserire una piccola descrzione dell'immobile come servizi e/o luoghi di interesse turistico"
                                                        onChange={this.handleChange("descrizione")}
                                                        errorMessage="Non sembra tu abbia inserito una descrizione"
                                                        required
                                                    />


                                                    <AvField
                                                        autofocus
                                                        name="importoTI"
                                                        type="number"
                                                        step="0.01"
                                                        min="0.00"
                                                        label="Importo Tassa Intera"
                                                        placeholder="50.00"
                                                        onChange={this.handleChange("importoTI")}
                                                        errorMessage="Inserisci il numero correttamente es. 235,00"
                                                        required
                                                    />

                                                    <AvField
                                                        name="importoTR"
                                                        type="number"
                                                        step="0.01"
                                                        min="0.00"
                                                        label="Importo Tassa Ridotta"
                                                        placeholder="25.00"
                                                        onChange={this.handleChange("importoTR")}
                                                        errorMessage="Inserisci il numero correttamente es. 235,00"
                                                        required
                                                    />

                                                    <label for="tipoPagamento">Che tipo di pagaento si accetta?</label>
                                                    <AvRadioGroup inline name="tipoPagamento" required errorMessage="Non sembra tu abbia inserito un tipo di pagamento" >
                                                        <AvRadio label="Pagamento online" value="online" onChange={this.handleChange("tipoPagamento")} />
                                                        <AvRadio label="Pagamento in contanti" value="contanti" onChange={this.handleChange("tipoPagamento")} />
                                                        <AvRadio label="Pagamento online/Pagamento in contanti" value="entrambi" onChange={this.handleChange("tipoPagamento")} />
                                                    </AvRadioGroup>
                                                    
                                                    <AvField 
                                                        name="prezzoSingola"
                                                        type="number"
                                                        step="0.01"
                                                        min="0.00"
                                                        label="Prezzo a notte stanza singola (in euro)"
                                                        placeholder="100.00"
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
                                                        placeholder="100.00"
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
                                                        placeholder="100.00"
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
                                                        placeholder="100.00"
                                                        onChange={this.handleChange("prezzoQuadrupla")}
                                                        errorMessage="Inserisci il numero correttamente es. 235,00"
                                                        required
                                                    />

                                                    <span>Comune</span>
                                                    <AvField required type="select" name="comune" onChange={this.handleChange("comune")}>
                                                        <option>Seleziona...</option>
                                                        <option value="Palermo">Palermo</option>
                                                        <option value="Roma">Roma</option>
                                                        <option value="Milano">Milano</option>
                                                        <option value="Catania">Catania</option>
                                                        <option value="Napoli">Napoli</option>
                                                    </AvField>

                                                    <AvField
                                                        autofocus
                                                        name="indirizzo"
                                                        type="text"
                                                        label="Indirizzo dell'immobile"
                                                        placeholder="Via Vladimir Putin"
                                                        onChange={this.handleChange("indirizzo")}
                                                        errorMessage="Non sembra tu abbia inserito un indirizzo"
                                                        required
                                                    />

                                                    <AvField type="select"  name="nSingole" label="Numero di singole" onChange={this.handleChange("nSingole")}>
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

                                                    <AvField type="select"  name="nDoppie" label="Numero di doppie" onChange={this.handleChange("nDoppie")}>
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

                                                    <AvField type="select"  name="nTriple" label="Numero di triple" onChange={this.handleChange("nTriple")} >
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

                                                    <AvField type="select"  name="nQuadruple" label="Numero di quadruple" onChange={this.handleChange("nQuadruple")} defaultValues0>
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

                                                    <AvField
                                                        type="file"
                                                        label="Inserisci una foto dell'immobile"
                                                        name="foto"
                                                        onChange={this.onChangeHandler}
                                                        errorMessage="Campo non valido"
                                                        required
                                                    />    
                                                    
                                                    <center>
                                                        <Button type="submit" color="danger">
                                                            Registra
                                                        </Button>
                                                    </center>
                                                    <br />
                                                </AvForm>
                                            </Container>

                                        </Jumbotron>
                                    </div>
                                </div>
                            </div>

                            <Footer />
                        </div>
                    );
                }
            }
    }
}
export default RegistrazioneAlloggio;