import React from 'react';
import ReactDOM from 'react-dom';

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: null,
            nombredepersonne: null,
        };
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        if (nam === "quantity") {
            if (!Number(val)) {
                alert("Your age must be a number");
            }
        }
        this.setState({[nam]: val});
    }
    <!-- ici on crée le html qui sera la simulation -->
    render() {

        return (
            <form>
                <p>Enter your quantity:</p>
                <input
                    type='text'
                    name='quantity'
                    onChange={this.myChangeHandler}
                />
                <p>Enter your nombredepersonne:</p>
                <input
                    type='text'
                    name='nombredepersonne'
                    onChange={this.myChangeHandler}
                />
            </form>
        );
    }
}

ReactDOM.render(<MyForm />, document.getElementById('simulationDiv'));  <!-- id du div où on rajoute le code -->