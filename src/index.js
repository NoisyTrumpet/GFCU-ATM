import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Map from './components/Map/Map'
import reportWebVitals from './reportWebVitals';

const center = {
  lat: 30.26,
  lng: -97.74
}

ReactDOM.render(
  <React.StrictMode>
    <Map title="GFCU MAP" center={center} zoom={7} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
