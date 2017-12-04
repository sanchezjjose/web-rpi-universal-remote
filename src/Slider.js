import React, { Component } from 'react';
import './Slider.css';

class Slider extends Component {
  
  render() {
    return (
      <div className="mdc-slider mdc-slider--discrete" tabIndex="0" role="slider" aria-valuemin="60" aria-valuemax="88" aria-valuenow="68" data-step="2" aria-label="Select Value">
        <div className="mdc-slider__track-container">
          <div className="mdc-slider__track"></div>
        </div>
        <div className="mdc-slider__thumb-container">
          <div className="mdc-slider__pin">
            <span className="mdc-slider__pin-value-marker"></span>
          </div>
          <svg className="mdc-slider__thumb" width="21" height="21">
            <circle cx="10.5" cy="10.5" r="7.875"></circle>
          </svg>
          <div className="mdc-slider__focus-ring"></div>
        </div>
      </div>
    );
  }
}

export default Slider;
