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
            mode: data.settings.mode || this.state.mode,
            speed: data.settings.speed || this.state.speed,
            temp: data.settings.temp ||  this.state.temp
          });
        });
      })
      .catch(err => {
        console.log('Error: ', err.message);
      })
  }

  buildRequestUrl() {
    const endpoint = this.state.isOff ? 'on' : 'set'; 
    const query = `mode=${this.state.mode}&speed=${this.state.speed}&temp=${this.state.temp}`

    return `${this.props.url}/${endpoint}?${query}`
  }

  handleClick(turnOn, mode, e) {
    e.preventDefault();

    const requestUrl = this.buildRequestUrl();

    this.setState(prevState => ({
      isOn: turnOn,
      isOff: !turnOn,
      mode: mode
    }));

    console.log(requestUrl);

    //fetch(this.props.url)
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
    return (
      <div className="App">
          <Header />
          <main className="main">
              <div className="card air-conditioner">
                  <div className='temperature'>
                    {this.state.isOn ? 'On ' + this.state.mode + this.state.speed + this.state.temp : 'Off'}
                  </div>

                  <button className='button' onClick={this.handleClick.bind(this, true, 'cool')}>Turn On COOL</button>
                  <button className='button' onClick={this.handleClick.bind(this, true, 'heat')}>Turn On HEAT</button>
                  <button className='button' onClick={this.handleClick.bind(this, true, 'dry')}>Turn On DRY</button>
                  <button className='button' onClick={this.handleClick.bind(this, true, 'fan')}>Turn On FAN</button>
                  <button className='button' onClick={this.handleClick.bind(this, false, '')}>Turn Off</button>
              </div>
          </main>
      </div>
    );
  }
}

export default App;
