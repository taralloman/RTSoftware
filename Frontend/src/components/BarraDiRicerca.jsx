import React from 'react';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { Button, Row, Col } from 'reactstrap';
import CounterInput from "react-counter-input";
import axios from 'axios';
import history from "../history";

import '../assets/css/CSSN.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

class BarraDiRicerca extends React.Component {
    state = {
        bnb: "bnb",
        nOspitiAdulti: "0",
        nOspitiBambini: "0",
        indefinito: false,
        destinazione: localStorage.getItem("destinazione")
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        if (this.state.destinazione == "" ||
            this.state.dataArrivo == "" ||
            this.state.dataPartenza == "") {
        }
        else {

            axios
                .post(
                    "/ricerca",
                    {
                        bnb: this.state.bnb,
                        nOspitiAdulti: this.state.nOspitiAdulti,
                        nOspitiBambini: this.state.nOspitiBambini,
                        dataArrivo: this.state.dataArrivo,
                        dataPartenza: this.state.dataPartenza,
                        destinazione: this.state.destinazione
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
                        if(res.data.data!== (undefined || null))
                        {
                            this.setState({indefinito: false})
                        }
                        else{
                            this.setState({indefinito: true});
                        }
                        localStorage.removeItem("completa");
                        localStorage.setItem("bnb", this.state.bnb);
                        localStorage.setItem("destinazione", this.state.destinazione);
                        localStorage.setItem("dataArrivo", this.state.dataArrivo);
                        localStorage.setItem("dataPartenza", this.state.dataPartenza);
                        localStorage.setItem("nOspitiAdulti", this.state.nOspitiAdulti);
                        localStorage.setItem("nOspitiBambini", this.state.nOspitiBambini);
                        localStorage.setItem("indefinito", JSON.stringify(this.state.indefinito));
                        localStorage.setItem("alloggiFiltrati", res.data.data);
                        history.push("/Ricerca");
                        window.location.reload();
                    } else {
                        alert(res.data.message);
                    }
                });
        }
    };

    render() {
        const defaultDestinazione= {
            destinazione: localStorage.getItem("destinazione")
        };

        return (
            <div style={{ textAlign: 'center' }}>
                <br></br>
                <div className="BarraDiRicerca" >
                    <strong><h3 style={{ color: "#6c757d"}}>Compila i campi, al resto ci pensiamo noi!</h3></strong>
                    <AvForm onSubmit={this.onValidSubmit} model={defaultDestinazione}>
                        <Row style={{ marginLeft: "2%", marginRight: "2%", marginTop: "1%" }}>
                            <Col xs="2">
                                <span>Alloggio</span>
                                <AvField type="select" name="bnb" onChange={this.handleChange("bnb")}>
                                    <option value="bnb">B&B</option>
                                    <option value="cv">Casa vacanze</option>
                                    <option value="e">Entrambi</option>
                                </AvField>
                            </Col>
                            <Col xs="2">
                                <span >Destinazione</span>
                                <AvField type="select" name="destinazione" onChange={this.handleChange("destinazione")}>
                                    <option value="Palermo">Palermo</option>
                                    <option value="Roma">Roma</option>
                                    <option value="Milano">Milano</option>
                                    <option value="Catania">Catania</option>
                                    <option value="Napoli">Napoli</option>
                                </AvField>
                                
                            </Col>
                            <Col xs="2">
                                <AvGroup>
                                    <span>Arrivo</span>
                                    <AvField
                                        name="dataArrivo"
                                        onChange={this.handleChange("dataArrivo")}
                                        type="date"
                                        min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toJSON().slice(0,10)}
                                        onfocus="(this.type='date')"
                                        errorMessage="Data non valida"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: "Data mancante",
                                            }
                                        }}
                                    />
                                </AvGroup>
                            </Col>
                            <Col xs="2">
                                <AvGroup>
                                    <span>Partenza</span>
                                    <AvField
                                        name="dataPartenza"
                                        type="date"
                                        onChange={this.handleChange("dataPartenza")}
                                        min={this.state.dataArrivo}
                                        errorMessage="Data non valida"
                                        validate={{
                                            required: {
                                                value: true,
                                                errorMessage: "Data mancante",
                                            }
                                        }}
                                    />
                                </AvGroup>
                            </Col>

                            <Col>
                                <span>Adulti</span>
                                <div>
                                    <div className="campoPersone" >
                                        <CounterInput
                                            min={0}
                                            max={10}
                                            onCountChange={count => this.setState({ nOspitiAdulti: count })}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <span>Bambini</span>
                                <div className="campoPersone">
                                    <CounterInput
                                        min={0}
                                        max={10}
                                        onCountChange={count => this.setState({ nOspitiBambini: count })}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <br></br>
                                <Button type="submit" color="danger">
                                    Cerca
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            
                            {localStorage.getItem("completa") == "1"
                                ? <div className="completa"><p>ADESSO BASTA COMPLETARE LA RICERCA!</p></div>
                                :<p></p>}
                            
                        </Row>

                    </AvForm>
                </div>
                <br></br>
                <br></br>
            </div>
        );
    }
}

export default BarraDiRicerca;