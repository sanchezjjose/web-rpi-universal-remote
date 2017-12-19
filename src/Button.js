import React, { Component } from 'react';
import './Button.css';

class Button extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    e.preventDefault();

    this.props.handleClick(
      this.props.isOn,
      this.props.mode
    )
  }

  render () {
    return (
      <button className='mdc-button mdc-button--raised' onClick={this.handleClick}>
        {this.props.textValue}
      </button>
    );
  };
}

export default Button;
