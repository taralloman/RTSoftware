import React, { Component } from 'react';
import { Card, CardTitle, CardText} from 'reactstrap';


import '../assets/css/CSSN.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

import Header from './../components/Header';
import Footer from './../components/Footer';
import ProfileUi from 'react-profile-card';



class ChiSiamo extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="body" style={{textAlign: 'center'}}>
                    <div className="ChiSiamo">
                        <br></br>
                        <div className="divChiSiamoSx">
                            <ProfileUi
                                imgUrl={require('./../assets/img/Ferrara1.png')} className="imgProfilo" style={{ width: "190px", height: "190px"}}
                                name='Emanuele Ferrara'
                                designation='Frontender'
                            />
                            <Card className="cardChiSiamo" body outline color="secondary">
                                <CardTitle><strong>Tarallo</strong></CardTitle>
                                <CardText>Sono un amante dei viaggi e della sicurezza informatica, spero 
                                un giorno di potere unire le mie due passioni e renderle la mia vita, il mio lavoro... 
                                ma chissa', del resto non mi e' dispiaciuto lavorare al frontend
                            </CardText>
                            </Card>
                        </div>

                        <br></br>

                        <div className="divChiSiamoDx">
                            <Card className="cardChiSiamo" body outline color="secondary">
                                <CardTitle><strong>Lo Zio</strong></CardTitle>
                                <CardText>Ho sempre sognato di essere dove sono in questo momento, studiare ciò che mi piace e nutrire
                                la mia curiosità. Il computer è la bicicletta della nostra mente</CardText>
                            </Card>
                            <ProfileUi
                                imgUrl={require('./../assets/img/Villa.JPG')} className="imgProfilo" 
                                name='Fabio Villa'
                                designation='Backender'
                            />
                        </div>

                        <br></br>

                        <div className="divChiSiamoSx">
                            <ProfileUi
                                imgUrl={require('./../assets/img/Licari.jpg')} className="imgProfilo" 
                                name='Riccardo Licari'
                                designation='Frontender'
                            />
                            <Card className="cardChiSiamo" body outline color="secondary">
                                <CardTitle><strong>Il Capitano</strong></CardTitle>
                                <CardText>Da ragazzino ero indeciso sul mio futuro, chi sono? Chi voglio diventare?
                                La mia passione per le automobili mi avrebbe portato metaforicamente fuoristrada.
                                Poi ho capito la via giusta, piena di errori, bug ma soddisfazioni.</CardText>
                            </Card>
                        </div>

                        <br></br>

                        <div className="divChiSiamoDx ">
                            <Card className="cardChiSiamo" body outline color="secondary">
                                <CardTitle><strong>Valium</strong></CardTitle>
                                <CardText>Un mio professore alle scuole superiori mi chiese: " Giovanni ma come ti vedi tra qualche anno ?"
                                Da classico adolescente, confuso risposi con dubbio, poi ho realizzato il mio prima programmino in C,
                                affronto la vita una scanf alla volta</CardText>
                            </Card>
                            <ProfileUi
                                imgUrl={require('./../assets/img/Valium.jpg')} className="imgProfilo" 
                                name='Giovanni Bernardo'
                                designation='Backender'
                            />
                        </div>
                        <br></br>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
export default ChiSiamo;