import React from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';

class BottoneGestioneAlloggiProprietari extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idUtente: localStorage.getItem("idUtente"),
            modal: false,
            email: "",
            isLoading: true,
            immobile: null
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        axios
            .post(
                "/getAlloggi",
                {
                    testo: "TESTO SCRITTO A MANO",
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
                    this.setState({ immobili: JSON.parse(JSON.stringify(res.data.data2)) });
                    this.setState({ isLoading: false })
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
        if (this.state.immobile != null) {
            localStorage.setItem("id_alloggio", this.state.immobile);
        }
        if (this.state.isLoading) {
            return (<div></div>)
        }
        else {

            return (
                <div>
                    <Button color='danger' onClick={this.toggle}>Vai</Button>

                </div>
            );
        }
    }
}

export default BottoneGestioneAlloggiProprietari; 