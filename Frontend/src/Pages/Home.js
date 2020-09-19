import React, { Component } from 'react';
import Header from './../components/Header';
import Slide from './../components/Slide';
import BoxInformazioni from './../components/BoxInformazioni';
import Footer from './../components/Footer';
import BarraDiRicerca from './../components/BarraDiRicerca';

import '../assets/css/CSSN.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';


class Home extends Component {
    render() {
        
        return(
            <div className="body">
                <Header />
                <BarraDiRicerca className="BarraDiRicerca" />
                <Slide />
                <BoxInformazioni />
                <Footer />
            </div>
        );
    }
}
export default Home;