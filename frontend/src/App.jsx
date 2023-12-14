import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import Approutes from "./Routes/Approutes";
const App = () => (
  <div className="app-container">
    <Approutes/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
