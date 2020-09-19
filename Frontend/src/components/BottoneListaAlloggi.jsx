import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import axios from 'axios';
import BottoneVisualizzaAlloggioHost from './BottoneVisualizzaAlloggioHost';
import BottoneRichiediEntrate from './BottoneRichiediEntrate';

class BottoneListaAlloggi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            email: "",
            isLoading: true,
            immobile: null,
            idUtente: this.props.idUtente,
            indefinito: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount ()
    {
        axios
        .post(
          "/getAlloggi",
          {
              testo:"TESTO SCRITTO A MANO",
              idUtente: this.state.idUtente
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
              if(res.data.data2!== undefined)
                {
                    this.setState({immobili: JSON.parse(JSON.stringify(res.data.data2))});
                }else{
                    this.setState({indefinito: true})
                }
              this.setState({isLoading: false})
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
        if(this.state.immobile!= null){
            localStorage.setItem("id_alloggio", this.state.immobile);
        }
        if(this.state.isLoading)
        {
            return (<div></div>)
        }
        else
        {
            if(!this.state.indefinito)
            {    return (
                    <div>
                        <Button color='danger' onClick={this.toggle}>Visualizza</Button>
                        <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>LISTA ALLOGGI</ModalHeader>
                            <ModalBody style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
                            
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <td>
                                        <strong><td>#</td></strong>
                                        
                                        <tr><strong>Nome alloggio</strong>
                                            { this.state.immobili.map(immobile => <td>{immobile.nome_alloggio}</td>)}
                                        </tr>
                                        
                                            
                                        <tr><strong>Tipo alloggio</strong> (0=Casa Vacanze, 1=BnB)
                                            { this.state.immobili.map(immobile => <td>{immobile.bnb}</td>)}
                                        </tr>
                                            
                                        <tr><strong>Comune</strong>
                                            { this.state.immobili.map(immobile => <td>{immobile.ref_comune}</td>)}
                                        </tr>
                                        <tr>
                                            <br></br>
                                            {this.state.immobili.map(immobile => <td><BottoneVisualizzaAlloggioHost idAlloggio={immobile.id_alloggio}/></td>)}
                                        </tr>
                                        <tr>
                                            <br></br>
                                            {this.state.immobili.map(immobile => <td><BottoneRichiediEntrate idAlloggio={immobile.id_alloggio} /></td>)}
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
            }else{
                return(
                    <div>
                        <Button color='danger' onClick={this.toggle}>Visualizza</Button>
                        <Modal size='xl' centered isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            
                            <ModalBody style={{ maxHeight: "calc(100vh - 210px)", overflowY: "auto" }}>
                                <h4>Non ci sono alloggi da visualizzare</h4>
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
}

export default BottoneListaAlloggi;