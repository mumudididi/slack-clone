import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  </Router>
);
