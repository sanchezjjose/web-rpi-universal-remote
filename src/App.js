import React, { Component } from 'react';
import Header from './Header';
import Status from './Status';
import Slider from './Slider';
import Button from './Button';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOff: true,
      isOn: false,
      mode: 'dry',
      speed: 'auto',
      temp: '72'
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.buildRequestUrl = this.buildRequestUrl.bind(this);
    this.handleTempChange = this.handleTempChange.bind(this);
  }

  componentDidMount() {
    fetch(this.props.url + '/status')
      .then(response => {
        response.json().then(data => {
          this.setState(prevState => ({
            isOn: data.isOn,
            isOff: data.isOff,
            mode: (data.settings && data.settings.mode) || prevState.mode,
            speed: (data.settings && data.settings.speed) || prevState.speed,
            temp: (data.settings && data.settings.temp) || prevState.temp
          }));
        });
      })
      .catch(err => {
        console.log('Error: ', err.message);
        alert('There was a problem with your request.');
      })
  }

  buildRequestUrl(turnOn, mode, speed, temp) {
    if (turnOn) {
      const endpoint = this.state.isOn ? 'set' : 'on'; 
      const query = `mode=${mode}&speed=${speed}&temp=${temp}`

      return `${this.props.url}/${endpoint}?${query}`
    }

    return `${this.props.url}/off`;
  }

  handleClick(turnOn, mode, speed = 'auto', temp = this.state.temp) {
    const requestUrl = this.buildRequestUrl(turnOn, mode, speed, temp);

    fetch(requestUrl)
      .then(response => {
        response.json().then(data => {
          this.setState({
            isOn: turnOn,
            isOff: !turnOn,
            mode: mode,
            speed: speed,
            temp: temp
          });
        });
      })
      .catch(err => {
        console.log('Error: ', err.message);
        alert('There was a problem with your request.');

        this.setState(prevState => ({
            mode: prevState.mode,
            speed: prevState.speed,
            temp: prevState.temp
        }));
      })
  }

  handleTempChange (tempValue, e) {
    e.preventDefault();

    this.handleClick(
      this.state.isOn,
      this.state.mode,
      this.state.speed,
      tempValue
    );
  }

  render() {
    return (
      <div className="App">
          <Header />
          <main className="main">
              <div className="card ac">
                  <Status isOn={this.state.isOn} mode={this.state.mode} speed={this.state.speed} temp={this.state.temp} />
                  <Slider handleChange={this.handleTempChange} temp={this.state.temp} />
                  <div className='submit'>
                    <Button textValue='Cool On' isOn={true} mode='cool' handleClick={this.handleClick} />
                    <Button textValue='Heat On' isOn={true} mode='heat' handleClick={this.handleClick} />
                    <Button textValue='Dry On'  isOn={true} mode='dry' handleClick={this.handleClick} />
                    <Button textValue='Turn Off' isOn={false} mode='off' handleClick={this.handleClick} />
                  </div>
              </div>
          </main>
      </div>
    );
  }
}

export default App;
