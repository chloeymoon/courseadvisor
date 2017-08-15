import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React!!!</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form>
          <select name="semester">
            <option>Fall 2017</option>
            <option>Spring 2017</option>
            <option>Fall 2016</option>
            <option>Spring 2016</option>
            <option>Fall 2015</option>
            <option>Spring 2015</option>
            <option>Fall 2014</option>
          </select>
        </form>
      </div>
    );
  }
}

export default App;
