import React, { Component, createContext } from "react";
import { extendObservable, action } from "mobx";
// import { configure } from "mobx";

// configure({
//   enforceActions: "never",
// });
// refer to https://codingislove.com/setup-mobx-react-context/
export class LoginStore extends Component {
  constructor(props) {
    super(props);
    extendObservable(this, {
      email: "",
      password: "",
    });
  }

  setUser = action((field, value) => {
    this[field] = value;
  });
}

const LoginContext = createContext();
export default LoginContext;
