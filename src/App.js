import React from 'react';
import './App.css';

init({
    size:10000,
    storageBackend: AsyncStorage,
})

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleMessage = this.handleMessage.bind(this);
        this.state = {
            message: '',
        };
    }

    componentDidMount() {

    }

    handleMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    render() {
        return (
            <div className="App">
                <p>Hello, MQTT</p>
                <input onChange={this.handleMessage}/>

                <button onClick={this.send.bind(this)}>
                    SendMessage
                </button>

            </div>
        );
    }
}

export default App;
