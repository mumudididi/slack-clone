import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import LoginContext, { LoginStore } from "./stores/LoginContext";
import Login from "./Login";

export default () => (
  <LoginContext.Provider value={new LoginStore()}>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  </LoginContext.Provider>
);
