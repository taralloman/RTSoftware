import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../assets/css/CSSN.css';
import '../assets/css/style.css';

class Footer extends React.Component {
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
    render(){
        return(
        <div >
        
            <footer id="footer">
                <div class="footer-top" >
                    <div class="container">
                        <div class="row">

                            <div class="col-lg-3 col-md-6">
                                <div class="footer-info">
                                    <br></br>
                                    <h3>ReadyTravel</h3>
                                    <p>
                                        <h4>Sede legale</h4> 
                                        <ul>
                                                <li>Terrazza di Ferrara <br></br></li>
                                                <li>Palermo, ITA<br></br><br></br></li>  
                                        </ul>                               
                                    </p>
                                </div>
                            </div>
                           
                            <div class="col-lg-3 col-md-6" style={{marginTop: '6px'}}>
                                <br></br>
                                <br></br>
                                <br></br>
                                <h4>I nostri servizi</h4>
                                <ul>
                                <li><i class="bx bx-chevron-right"></i> Web Design</li>
                                <li><i class="bx bx-chevron-right"></i> Web Development</li>
                                <li><i class="bx bx-chevron-right"></i> Product Management</li>
                                <li><i class="bx bx-chevron-right"></i> Graphic Design</li>
                                </ul>
                            </div>

                            <div class="col-lg-3 col-md-6" style={{marginTop: '6px'}}>
                                <br></br>
                                <br></br>
                                <br></br>
                                <h4>I nostri contatti</h4>
                                <ul>
                                <li><i class="bx bx-chevron-right"></i><strong>Telefono:</strong> 324 6071878</li>
                                <li><i class="bx bx-chevron-right"></i><strong>Email:</strong> ropeteam@gmail.com</li>
                                </ul>
                            </div>

                            <div class="col-lg-3 col-md-6" style={{marginTop: '6px'}}>
                                
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container">
                    <div class="copyright">
                        &copy; Copyright <strong><span>RT Software</span></strong>. All Rights Reserved
                    </div>
                    <div class="credits">
                    </div>
                </div>
            </footer>
        </div>
        )
    }
}

export default Footer;