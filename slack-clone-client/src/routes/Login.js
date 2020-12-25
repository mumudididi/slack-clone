import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import LoginContext from "./stores/LoginContext";
import { Message, Button, Container, Header, Input } from "semantic-ui-react";

const Login = observer(() => {
  const LoginStore = useContext(LoginContext);
  const onChange = (e) => {
    const { name, value } = e.target;
    LoginStore.setUser(name, value);
  };
  const onSubmit = (e) => {
    console.log(LoginStore.email);
    console.log(LoginStore.password);
  };

  return (
    <Container text>
      <Header as="h2">Login</Header>
      <Input
        name="email"
        onChange={onChange}
        value={LoginStore.email}
        placeholder="Email"
        fluid
      />
      <Input
        name="password"
        onChange={onChange}
        value={LoginStore.password}
        placeholder="Password"
        fluid
      />
      <Button onClick={onSubmit}>Login</Button>
    </Container>
  );
});

export default Login;
