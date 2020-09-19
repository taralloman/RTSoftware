import React, { Component } from 'react';
import { Jumbotron, Container, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { FaUserEdit } from 'react-icons/fa';
import history from "../history";
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from "axios";
import BottoneRecuperaPassword from '../components/BottoneRecuperaPassword';

import '../assets/css/CSSN.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';


class RegistrazioneUtente extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: "",
            cognome: "",
            email: "",
            psw: "",
            cpsw: "",
            strongRegex : new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),
            passwordvalida: false

        };

    }
    
    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };


    analyze () {
        if(this.state.strongRegex.test(this.state.psw)) 
        {
            this.setState({passwordvalida: true});
            alert("Password sicura")
        } 
        else 
        {
            this.setState({passwordvalida: false});
            alert("Ricordati che la password deve avere almeno 8 caratteri, almeno una maiuscola, almeno una minuscola e un carattere speciale tra !@#$%^&")
        }
    }

    onValidSubmit = (event) => { 
        {this.analyze()};
        if(this.state.passwordvalida)
        {
        
            event.preventDefault();
                event.preventDefault();
                if(this.state.psw==this.state.cpsw){
                    axios
                        .post(
                            "/registrazioneUtente",
                            {
                                //testo:"TESTO SCRITTO A MANO",
                                email: this.state.email,
                                nome: this.state.nome,
                                cognome: this.state.cognome,
                                password: this.state.psw,
                        
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
                                history.push("/login");
                                window.location.reload();
                            } else {
                                alert(res.data.message);
                            }
                        });
                }else alert("Attenzione, le password inserite non combaciano");
            }
        

    };

    render() {
        return (
            <div>
                <Header />
                <div className="panelloRegistrazione body">
                    <br></br>
                    <div
                        class="row h-100 justify-content-md-center"
                        style={{  minHeight: "83vh"}}
                    >
                        <div class="col-sm-12 col-md-8 col-lg-6 my-auto">
                            <Jumbotron>
                                <Container fluid>
                                    <center>
                                        <h2 style={{color: "black"}}>Registrazione</h2>
                                        <FaUserEdit color="black" size="200px" />
                                    </center>

                                    <AvForm onValidSubmit={this.onValidSubmit}>
                                    <AvField
                                            autofocus
                                            name="nome"
                                            type="nome"
                                            label="Nome"
                                            placeholder="Pippo"
                                            onChange={this.handleChange("nome")}
                                            errorMessage="Non sembra tu abbia inserito un nome"
                                            required
                                        />


                                        <AvField
                                            autofocus
                                            name="cognome"
                                            type="cognome"
                                            label="Cognome"
                                            placeholder="Baudo"
                                            onChange={this.handleChange("cognome")}
                                            errorMessage="Non sembra tu abbia inserito un cognome"
                                            required
                                        />


                                        <AvField
                                            autofocus
                                            name="email"
                                            type="email"
                                            label="Email"
                                            placeholder="@"
                                            onChange={this.handleChange("email")}
                                            errorMessage="Non sembra tu abbia inserito una mail"
                                            required
                                        />

                                        <AvField
                                            name="psw"
                                            type="password"
                                            label="Password"
                                            placeholder="*"
                                            onChange={this.handleChange("psw")}
                                            errorMessage="Campo obbligatorio"
                                            required
                                        />


                                        <AvField
                                            name="cpsw"
                                            type="password"
                                            label="Conferma password"
                                            placeholder="*"
                                            onChange={this.handleChange("cpsw")}
                                            errorMessage="Campo obbligatorio"
                                            required
                                        />
                                        

                                        <center>
                                            <Button type="submit" color="danger">
                                                Registrati
                                            </Button>
                                        </center>
                                        <br />
                                    </AvForm>
                                </Container>

                                
                                <center>
                                    <BottoneRecuperaPassword />
                                </center>
                                
                            </Jumbotron>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}
export default RegistrazioneUtente;