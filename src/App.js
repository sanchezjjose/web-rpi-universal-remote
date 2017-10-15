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

                  <div className='ac-status'>
                    {this.state.isOn ? (
                        <div className='ac-status-on'>
                          The Unit is On
                          <i className="material-icons">ac_unit</i>
                        </div>
                      ) : (
                        <div className='ac-status-off'>
                          The Unit is Off
                          <i className="material-icons">block</i>
                        </div>
                      )}
                  </div>

                  {this.state.isOn && 
                    <div className='settings'>
                      {this.state.mode}, {this.state.speed}, {this.state.temp} Degrees Fahrenheit
                    </div>} 

                  <div class="mdc-slider mdc-slider--discrete" tabindex="0" role="slider"
                       aria-valuemin="60" aria-valuemax="88" aria-valuenow="68" data-step="2"
                       aria-label="Select Value">
                    <div class="mdc-slider__track-container">
                      <div class="mdc-slider__track"></div>
                    </div>
                    <div class="mdc-slider__thumb-container">
                      <div class="mdc-slider__pin">
                        <span class="mdc-slider__pin-value-marker"></span>
                      </div>
                      <svg class="mdc-slider__thumb" width="21" height="21">
                        <circle cx="10.5" cy="10.5" r="7.875"></circle>
                      </svg>
                      <div class="mdc-slider__focus-ring"></div>
                    </div>
                  </div>

                  <div className='submit'>
                    <button className='button' onClick={this.handleClick.bind(this, true, 'cool', 'auto', '70')}>
                      Turn On COOL
                    </button>
                    <button className='button' onClick={this.handleClick.bind(this, true, 'heat', 'auto', '76')}>
                      Turn On HEAT
                    </button>
                    <button className='button' onClick={this.handleClick.bind(this, true, 'dry', 'auto', '70')}>
                      Turn On DRY
                    </button>
                    <button className='button' onClick={this.handleClick.bind(this, false, '', '', '')}>
                      Turn Off
                    </button>
                  </div>
              </div>
          </main>
      </div>
    );
  }
}

export default App;
