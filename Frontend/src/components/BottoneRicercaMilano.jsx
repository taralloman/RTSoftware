import React from 'react';
import { Button } from '@material-ui/core';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';


export default class Bottone extends React.Component {

    handleClick = () => {
        localStorage.setItem("destinazione", "Milano");
        window.location.reload();
        localStorage.setItem("completa", "1")
    }

       
    render(){
        return(
            <div>
                <Button onClick={this.handleClick} variant="contained" color="secondary" disableElevation>
                    Milano
                </Button>
            </div>
        )
    }
}