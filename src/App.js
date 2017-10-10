import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  handleSubmit(e) {
    e.preventDefault();

    console.log(e.target.className);
    console.log(e.target.href);
    console.log('button clicked');

    //fetch('http://sanchezjjose:8080/on');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Home Assistant</h1>
        </header>
        <p className="App-intro">
          <a href='/on' className='turn-on' onClick={this.handleSubmit}>Turn On</a>
          <a href='/off' className='turn-off' onClick={this.handleSubmit}>Turn Off</a>
        </p>
      </div>
    );
  }
}

export default App;
