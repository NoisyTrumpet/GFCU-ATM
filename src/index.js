import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import Map from "./components/Map/Map";
import reportWebVitals from "./reportWebVitals";
import Geocode from "react-geocode";

import SA_CENTER from "./constants/sa_center";

Geocode.setApiKey(process.env.REACT_APP_MAP_API);

ReactDOM.render(
  <div className="atm-app">
    <link rel="https://cdn.rawgit.com/mfd/f3d96ec7f0e8f034cc22ea73b3797b59/raw/856f1dbb8d807aabceb80b6d4f94b464df461b3e/gotham.css" />
    <script
      src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBfEp-SAhpJNtvFz3xakgrml80FfU25I3A`}
      type="text/javascript"
    ></script>
    <Map title="ATM & Shared Branch Locator" zoom={12} />
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
