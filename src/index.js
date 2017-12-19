import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

ReactDOM.render(<App url={SERVER_URL} />, document.getElementById('root'));
//registerServiceWorker();
