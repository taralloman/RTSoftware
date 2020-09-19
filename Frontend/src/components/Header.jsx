import React from 'react';
import history from "../history";
import BottoneLogout from './BottoneLogout';
import BottoneAmministratore from './BottoneAmministratore';
import axios from 'axios';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import '../assets/css/CSSN.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';


class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            navCollapsed: true,
            showNavbar: false,
            logged: false,
            idUtente: localStorage.getItem("idUtente"),
            amministratore: localStorage.getItem("amministratore"),
            isLoading: true
        };
    }
        componentDidMount() {
            axios
              .post(
                "/isLoggedIn",
                {
                    testo:"TESTO SCRITTO A MANO",
                    idUtente: this.state.idUtente,
                    amministratore: this.state.amministratore
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
                  this.setState({ logged: true });
                  this.setState({ isLoading: false });
                }
                else
                {
                    this.setState({ isLoading: false });
                }
              });
          }
    
    
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleRegistrazione = () => {
        history.push("/Registrazione");
        window.location.reload();
    };

    handleLogin = () => {
        history.push("/login");
        window.location.reload();
    };


    render(){
        if(this.state.isLoading)
        {
            return(<div></div>)
        }
        else
        {

        const BottoneLog = () => {
            if (!this.state.logged) {
                return (
                    <div>
                        <button
                            class="btn btn-primary ml-auto mr-1 glacialReg"
                            onClick={this.handleRegistrazione}
                        >
                            Registrati
                        </button>
                        <button
                            class="btn btn-primary ml-auto mr-1 glacialReg"
                            onClick={this.handleLogin}
                        >
                            Accedi
                        </button>
                    </div>
                );
            } else {
                
                if (this.state.amministratore == "1") {
                    return (	       
                        <div>
                            <div className="allineamento">
                                <BottoneAmministratore >
                                </BottoneAmministratore>
                            </div>
                            <div className="allineamento">
                                <BottoneLogout >	                    
                                </BottoneLogout>
                            </div>
                        </div>
                    );	                
                }
                else {
                    return (
                        <div>
                            <BottoneLogout />
                        </div>
                    );
                }
            }
        };
        const pagesLC = () => {
            if (!this.state.logged) {
                return (
                    <div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="asset2" href="/Prenotazioni">Prenotazioni</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="asset2" href="/Profilo">Profilo</NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                );
            }
        };

        const pageIA = () => {
            if (!this.state.logged) {
                return (
                    <NavItem>
                        <NavLink className="asset2" href="/Login">Registrazione alloggio</NavLink>
                    </NavItem>
                ); 
            } else {
                return (
                    <NavItem>
                        <NavLink className="asset2" href="/RegistrazioneAlloggio">Registrazione alloggio</NavLink>
                    </NavItem>
                );
            }
        };
        

        return(
                <div className="bordino">
                    <Navbar className="bianchetto" light expand="md">
                        <img src={require('./../assets/img/logo.jpg')} max-width="100%" height="80px" alt=""/>
                        <strong><NavbarBrand className="title"><p>ReadyTravel</p></NavbarBrand></strong>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="Header1" navbar>
                                <NavItem>
                                    <NavLink className="asset2" href="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="asset2" href="/ChiSiamo">Chi siamo</NavLink>
                                </NavItem>
                                {pageIA()}
                                {pagesLC()}
                            </Nav>
                        </Collapse>
                        {BottoneLog()}
                    </Navbar>
                </div>
        );
        }
    }
}

export default Header;


