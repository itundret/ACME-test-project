import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ACME from "./components/ACME.component";
function App() {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/list"} className="navbar-brand">
        Home
      </Link>
    </nav>

    <div className="container mt-3">
      <Switch>
        <Route exact path={["/", "/list"]} component={ACME} />
        
      </Switch>
    </div>
  </div>
  );
}

export default App;
