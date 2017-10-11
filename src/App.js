import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOn: false 
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    console.log(e.target.className);
    console.log(e.target.href);
    console.log('button clicked');

    console.log(this.props);

    this.setState(prevState => ({
      isOn: !prevState.isOn
    }));

    console.log(this.state.isOn);

    //fetch(this.props.SERVER_URL)
      //.then(response => {
        //response.json().then(data => {
          //console.log('Data', data);
        //});
      //})
      //.catch(err => {
        //console.log('Error: ', err.message);
      //})
  }

  render() {

    console.log(this.props);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Home Assistant</h1>
        </header>
        <p className="App-intro">
          <a href='/on' className='button turn-on' onClick={this.handleClick}>Turn On</a>
          <a href='/off' className='button turn-off' onClick={this.handleClick}>Turn Off</a>
        </p>
      </div>
    );
  }
}

export default App;
