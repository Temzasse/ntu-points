import React, { Component } from 'react';
import Gun from 'gun';
import logo from './logo.svg';
import './App.css';

const db = Gun(`${window.location.origin}/ntupoints`);

class App extends Component {
  constructor(props) {
    super(props);
    this.points = db.get('points');
    this.state = {
      points: {
        alexis: 0,
        milan: 0,
        ondra: 0,
      },
    };
  }

  componentDidMount() {
    this.points.on(this.handleDbUpdate);
  }

  handleDbUpdate = (data, key) => {
    console.log('update:', data, key);

    const points = {
      alexis: data.alexis || 0,
      milan: data.milan || 0,
      ondra: data.ondra || 0,
    };

    this.setState({ points });
  }

  handleClick = () => {
    const { points } = this.state;

    this.points.put({
      alexis: points.alexis + 10,
      milan: points.milan + 100,
      ondra: points.ondra + 1,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          <button onClick={this.handleClick}>
            Foooo
          </button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {Object.entries(this.state.points).map(([name, points]) =>
            <dl key={name}>
              <dt>Name: {name}</dt>
              <dd>Points: {points}</dd>
            </dl>
          )}
        </div>
      </div>
    );
  }
}

export default App;
