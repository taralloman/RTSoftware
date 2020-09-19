import React, { Component } from "react";
import axios from "axios";
import { Jumbotron, Container, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { FaUserLock } from 'react-icons/fa';

import history from "../history";

import Header from './../components/Header';
import Footer from './../components/Footer';
import BottoneRecuperaPassword from './../components/BottoneRecuperaPassword';

export default class Login extends Component {

    state = {
        email: "",
        psw: "",
        idUtente: null,
        amministratore: null,
    };
    
    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };

    onValidSubmit = (event) => {
        event.preventDefault();
        axios
            .post(
                "/loginUtente",
                {
                    email: this.state.email,
                    password: this.state.psw
            
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
                  alert("Login eseguito con successo!");
                  this.setState({idUtente: res.data.idUtente});
                  this.setState({amministratore: res.data.amministratore});
                  
                  localStorage.setItem(
                    "sessionValues",
                    JSON.stringify(res.data.session)
                  );
                  localStorage.setItem(
                    "email",
                    this.state.email
                );
                  localStorage.setItem(
                      "idUtente",
                      JSON.stringify(this.state.idUtente)
                  );
                  localStorage.setItem(
                      "password",
                      this.state.psw
                  );
                  localStorage.setItem(
                    "amministratore",
                    JSON.stringify(this.state.amministratore)
                  );

                  history.push("/");
                      
                    window.location.reload();
                } else {
                  alert(res.data.message);
                }
              });
    };

    render() {
        return (
            <div>
                <Header />
                <div className="pannelloLogin body">
                    <br></br>
                    <div
                        class="row h-100 justify-content-md-center"
                        style={{  minHeight: "83vh"}}
                    >
                        <div class="col-sm-12 col-md-8 col-lg-6 my-auto">
                            <Jumbotron>
                                <Container fluid>
                                    <center>
                                        <h2 style={{color: "black"}}>Accesso</h2>
                                        <FaUserLock color="black" size="200px" />
                                    </center>

                                    <AvForm onValidSubmit={this.onValidSubmit}>
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

                                        <br />

                                        <AvField
                                            name="psw"
                                            type="password"
                                            label="Password"
                                            placeholder="*"
                                            onChange={this.handleChange("psw")}
                                            errorMessage="Campo obbligatorio"
                                            required
                                        />

                                        <br />
                                        <center>
                                            <Button type="submit" color="danger">
                                                Login
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
                    <br></br>
                </div>

                <Footer />
            </div>
        );
    }
}