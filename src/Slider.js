import React, { Component } from 'react';
import { MDCSlider } from '@material/slider/dist/mdc.slider';
import './Slider.css';

let slider = null;

class Slider extends Component {

  componentDidMount() {
    // this.sliderDiv is an alternative to document.querySelector('.mdc-slider')
    slider = new MDCSlider(this.sliderDiv);
    slider.listen('MDCSlider:change', (e) => this.props.handleChange(slider.value, e));
  }

  componentDidUpdate() {
    // ensure proper value is set, and resets in case of error
    slider.value = this.props.temp;
  }
  
  render() {
    return (
      <div 
        ref={(div) => { this.sliderDiv = div }}
        className="mdc-slider mdc-slider--discrete" 
        tabIndex="0" 
        role="slider" 
        aria-valuemin="60" 
        aria-valuemax="88" 
        aria-valuenow={this.props.temp}
        data-step="2" 
        aria-label="Select Value">
        
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
