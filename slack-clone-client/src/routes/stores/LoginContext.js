import { Component, createContext } from "react";
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
      emailError: "",
      passwordError: "",
    });
  }

  setField = action((field, value) => {
    this[field] = value;
  });
  clearErrors = action(() => {
    this.passwordError = "";
    this.emailError = "";
  });
}

const LoginContext = createContext();
export default LoginContext;
