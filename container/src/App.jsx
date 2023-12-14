import React from "react";
import ReactDOM from "react-dom";
import  TeamApp  from 'team/TeamApp'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

const App = () => (
  <div className="app-container">
    <TeamApp/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
