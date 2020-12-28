import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
// import LoginContext, { LoginStore } from "./stores/LoginContext";
import Login from "./Login";
import CreateTeam from "./CreateTeam";
import ViewTeam from "./ViewTeam";

export default () => (
  // <LoginContext.Provider value={new LoginStore()}>
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/create-team" exact component={CreateTeam} />
      <Route path="/view-team" exact component={ViewTeam} />
    </Switch>
  </Router>
  // </LoginContext.Provider>
);
