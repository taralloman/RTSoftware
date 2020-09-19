import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Button } from '@material-ui/core';

export default class Bottone extends React.Component {

    handleClick = () => {
        localStorage.setItem("destinazione", "Palermo");
        window.location.reload();
        localStorage.setItem("completa", "1")
    }


    render(){
        return(
            <div>
                <Button onClick={this.handleClick} variant="contained" color="secondary" disableElevation>
                    Palermo
                </Button>
            </div>
        )
    }
}