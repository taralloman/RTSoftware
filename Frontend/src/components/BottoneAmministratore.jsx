import React from 'react';
import { Button } from 'reactstrap';
import history from "../history";

class BottoneAmministratore extends React.Component {

    handleClick() {
        history.push('/Amministratore');
        window.location.reload()
    }

    render() {
        return (
            <div>
                <Button color='danger' onClick={this.handleClick}>Admin</Button>
            </div>
        );
    }
}

export default BottoneAmministratore;