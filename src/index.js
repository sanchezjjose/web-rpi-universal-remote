import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MDCSlider } from '@material/slider/dist/mdc.slider';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

ReactDOM.render(<App url={SERVER_URL} />, document.getElementById('root'));
//registerServiceWorker();

const slider = new MDCSlider(document.querySelector('.mdc-slider'));
slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));
