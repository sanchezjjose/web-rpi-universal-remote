import React, { Component } from 'react';
import './Status.css';

class Status extends Component {

  render () {
    return (
      <div className='ac-status'>
        {this.props.isOn ? (
            <div className='ac-status-on'>
              The Unit is On
              <i className="material-icons">ac_unit</i>
            </div>
          ) : (
            <div className='ac-status-off'>
              The Unit is Off
              <i className="material-icons">block</i>
            </div>
          )
        }

        {this.props.isOn && 
          <div className='settings'>
            {this.props.mode}, {this.props.speed}, {this.props.temp}°F
          </div>
        }
      </div>
    );
  }
}

export default Status;
