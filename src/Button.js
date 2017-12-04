import React, { Component } from 'react';
import './Button.css';

class Button extends Component {

  render () {
    return (
      <button className='mdc-button mdc-button--raised' onClick={this.props.onClick}>
        {this.props.textValue}
      </button>
    );
  };
}

export default Button;
