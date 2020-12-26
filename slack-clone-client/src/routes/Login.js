import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { LoginStore } from "./stores/LoginContext";
// import LoginContext, { LoginStore } from "./stores/LoginContext";
import { Message, Button, Container, Header, Input } from "semantic-ui-react";

const Login = observer(() => {
  //   const LoginStore = useContext(LoginContext);
  const [loginStore] = useState(new LoginStore());
  const onChange = (e) => {
    const { name, value } = e.target;
    loginStore.setUser(name, value);
  };
  const onSubmit = (e) => {
    console.log(loginStore.email);
    console.log(loginStore.password);
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
