import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router';
import Grid from './components/Grid';
import Single from './components/Single';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <Link to="/">
              <h2>Welcome to React</h2>
                <img src={logo} className="App-logo" alt="logo" />
            </Link>
        </div>

          {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

export default App;
