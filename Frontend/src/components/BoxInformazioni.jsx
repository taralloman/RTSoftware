import React from 'react';
import { CardBody, Card } from 'reactstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

export default class BoxInformazioni extends React.Component {
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
                <div className="boxSinistra">
                    <Card body outline className="cardBox"> 
                    <p >
                        <strong>Perché scegliere ReadyTravel?</strong>
                        <br />
                        <CardBody>
                            Perché è un motore di ricerca che permette agli utenti di trovare l'ospitalità che più gli aggrada tra più di 5 B&B e 10 case vacanze. Ogni anno il nostro sito viene premiato per la sua semplicità e chiarezza. I viaggiatori lo utilizzano regolarmente per confrontare le offerte nella destinazione scelta. Se stai pianificando un bel viaggio a Roma oppure una fuga romantica a Palermo metti alla prova ReadyTravel.
                        </CardBody>
                    </p>
                    </Card>
                </div>

                <div className="boxDestra">
                    <Card body outline className="cardBox">
                        <p>
                            <strong>Come effettuare la prenotazione?</strong>
                            <br />
                            <CardBody>
                                Effettuare una prenotazione è semplice ed immediato: basta compilare i campi Alloggio, Destinazione, inserire i giorni di arrivo e partenza in loco e quanti adulti e bambini partiranno. Una volta fatto ciò verrete riportati in una pagina dove vi verranno mostrate le anteprime degli alloggi disponibili. Dopo aver visualizzato le altre informazioni potrete prenotare in maniera semplice e veloce seguendo le istruzioni.
                            </CardBody>
                        </p>
                    </Card>
                </div>
            </div>
        )
    }
}