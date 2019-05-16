import React from 'react';
import './App.css';
import {connect} from 'mqtt';

var client = null;


class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleMessage = this.handleMessage.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            message: '',
        };
    }

    componentDidMount() {
        client = connect('alis://192.168.1.130:61614');
        client.on('connect', err => {
            if (!err) {
                client.publish('mqtt/finch', 'Hello mqtt');
            }
        });

        client.on('message', (topic, message) => {
            console.log(message.toString());
            // client.end();
        });

        client.subscribe('mqtt/finch', (err, granted) => {
            if (!err) {
                console.log(granted);
                // client.end();
            }
        });
    }

    handleMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    handleClick() {
        console.info(client);



        client.publish("mqtt/finch", this.state.message, e => {
            console.info(e);
        })
    }

    render() {
        return (
            <div className="App">
                <p>Hello, MQTT</p>
                <input onChange={this.handleMessage}/>

                <button onClick={this.handleClick}>
                    SendMessage
                </button>

            </div>
        );
    }
}

export default App;
