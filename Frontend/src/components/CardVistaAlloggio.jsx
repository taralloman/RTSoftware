import React from 'react';
import BottoneVisualizzaAlloggio from './../components/BottoneVisualizzaAlloggio';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class CardVistaAlloggio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idAlloggio: null,
            isLoading: true
        };
    }
    

    handleClick = (input) => (e) => {
        
        this.setState({ [input]: this.props.idAlloggio });
        this.setState({isLoading: false});
    };

    render() {
            if (this.state.idAlloggio != null) {
                localStorage.setItem("id_alloggio", this.state.idAlloggio);
            }
            if (!this.state.isLoading){
                return (
                <div> </div>
                );
            }
            else
            {            
                return (
                    <div className="card card-inverse card-info mt-3" style={{ minHeight: "500px", minWidth: "300px" }}>
                        <div style={{width: '100%', height:'250px'}}>
                            <img className="card-img-top" src={this.props.foto} alt=""/>
                        </div>
                        <div className="card-block">
                            <figure className="cardProfile">
                                <img src="https://picsum.photos/200/150/?random" className="cardProfileAvatar" alt="" />
                            </figure>
                            <h4 className="card-title mt-5">{this.props.nome_alloggio}</h4>
                            <div className="meta card-text">
                                <a>{this.props.indirizzo}</a>
                            </div>
                            <div className="card-text" style={{ height: '144px', width: '316px' }}>
                                <p>{
                                    this.props.descrizione.length > 150
                                        ? this.props.descrizione.substring(0, 150) + " [...]"
                                        : this.props.descrizione
                                }</p>
                            </div>
                        </div>
                        <div className="card-footer">
                            {this.props.prezzo}€{" "}   
                            
                            <BottoneVisualizzaAlloggio
                                idAlloggio={this.props.idAlloggio}
                                idUtente={this.props.idUtente}
                                dataArrivo={this.props.dataArrivo}
                                dataPartenza={this.props.dataPartenza}
                                prezzo={this.props.prezzo}
                                tassaIntera={this.props.tassaIntera}
                                tassaRidotta={this.props.tassaRidotta}
                                nOspitiAdulti={this.props.nOspitiAdulti}
                                nOspitiBambini={this.props.nOspitiBambini}
                                bnb={this.props.bnb}
                            />
                        </div>
                    </div>
                );  
            }                             
        }  
    }