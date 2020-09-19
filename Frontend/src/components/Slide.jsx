import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import './../assets/css/CSSN.css'
import './../assets/css/style.css'
import BottoneRicercaMilano from './BottoneRicercaMilano';
import BottoneRicercaPalermo from './BottoneRicercaPalermo';
import BottoneRicercaRoma from './BottoneRicercaRoma';


export default class Slide extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            navCollapsed: true,
            showNavbar: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {

        return (
          <div>   
                      
            <Carousel className="prima" interval="3000" > 
              
              <Carousel.Item>
                 
                <img
                  className="dopoPalermo d-block w-100"
                  src={require('./../assets/img/slide/palermo.jpg')}
                  alt=""
                />
                
                <Carousel.Caption>
                <h3>PALERMO</h3>
                  <p>Palermo, sorge in una baia ai margini occidentali della Conca d’Oro. La città trae fascino e prestigio da una storia ricchissima e gloriosa, che la vide centro di quella feconda e originale fusione di culture – greco-bizantina, araba e latina – che è la caratteristica peculiare di tutta l’isola</p>
                  <BottoneRicercaPalermo />
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item >
                <img
                    className="dopo d-block w-100"
                  src={require('./../assets/img/slide/milano.jpg')}
                  alt=""
                />

                <Carousel.Caption>
                <div className="">
                  <h3>MILANO</h3>
                  <p>Milano, capoluogo lombardo che stupisce per le emozioni che sa regalare, è una città colta, moderna, vivace, e ricca di bellezze e opere artistiche. Il Duomo, con la luminosa facciata in marmo di Candoglia e l'architettura tardo-gotica, è il monumento simbolo di questa metropoli dell'Italia settentrionale</p>
                  <BottoneRicercaMilano />
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="dopo d-block w-100"
                  src={require('./../assets/img/slide/roma.jpg')}
                  alt=""
                />

                <Carousel.Caption>
                  <h3>ROMA</h3>
                  <p >Roma, "culla della civiltà", "Roma caput mundi", o semplicemente Roma, una città dai mille volti.
            Roma è la capitale politica dell'Italia, ma anche il centro della cristianità e ospita all'interno del suo territorio la città stato del Vaticano. Sede del papato, la sua struttura odierna è frutto di numerosi interventi urbanistici e architettonici che si sono stratificati attraverso i millenni.</p>
                  <BottoneRicercaRoma />
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        )
    }
}