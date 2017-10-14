import React, { Component } from 'react';
import Header from './Header';
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
  }

  componentDidMount() {
    fetch(this.props.url + '/status')
      .then(response => {
        response.json().then(data => {
          this.setState({
            isOn: data.isOn,
            isOff: data.isOff,
            mode: data.settings && data.settings.mode,
            speed: data.settings && data.settings.speed,
            temp: data.settings && data.settings.temp
          });
        });
      })
      .catch(err => {
        console.log('Error: ', err.message);
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

  handleClick(turnOn, mode, speed, temp, e) {
    e.preventDefault();

    const requestUrl = this.buildRequestUrl(turnOn, mode, speed, temp);

    console.log('Request: ', requestUrl);

    fetch(requestUrl)
      .then(response => {
        response.json().then(data => {
          console.log('Response: ', data);

          this.setState(prevState => ({
            isOn: turnOn,
            isOff: !turnOn,
            mode: mode,
            speed: speed,
            temp: temp
          }));
        });
      })
      .catch(err => {
        console.log('Error: ', err.message);
      })
  }

  render() {
    return (
      <div className="App">
          <Header />
          <main className="main">
              <div className="card ac">
                  <div className='current-status'>
                    {this.state.isOn ? 'The AC is On' : 'The AC is Off'}
                  </div>

                  {this.state.isOn && 
                    <div className='settings'>
                      {this.state.mode}, {this.state.speed}, {this.state.temp} Degrees Fahrenheit
                    </div>} 

                  <div className='submit'>
                    <button className='button' onClick={this.handleClick.bind(this, true, 'cool', 'auto', '70')}>Turn On COOL</button>
                    <button className='button' onClick={this.handleClick.bind(this, true, 'heat', 'auto', '76')}>Turn On HEAT</button>
                    <button className='button' onClick={this.handleClick.bind(this, true, 'dry', 'auto', '70')}>Turn On DRY</button>
                    <button className='button' onClick={this.handleClick.bind(this, false, '', '', '')}>Turn Off</button>
                  </div>
              </div>
          </main>
      </div>
    );
  }
}

export default App;
