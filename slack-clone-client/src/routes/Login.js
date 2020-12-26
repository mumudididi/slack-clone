import React, { useState } from "react";
import { observer } from "mobx-react";
import { LoginStore } from "./stores/LoginContext";
import { useHistory } from "react-router-dom";
// import LoginContext, { LoginStore } from "./stores/LoginContext";
import { Message, Button, Container, Header, Input } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

const Login = observer(() => {
  //   const LoginStore = useContext(LoginContext);
  const [loginStore] = useState(new LoginStore());

  const history = useHistory();
  // structure of data : { register: {ok: false, errors: [(),()...]}}
  const [login, { data, loading, error }] = useMutation(loginMutation);

  const onChange = (e) => {
    const { name, value } = e.target;
    loginStore.setField(name, value);
  };

  const getLocalStorage = () => {
    var i;

    console.log("local storage");
    for (i = 0; i < localStorage.length; i++) {
      console.log(
        localStorage.key(i) +
          "=[" +
          localStorage.getItem(localStorage.key(i)) +
          "]"
      );
    }
  };

  const onSubmit = async (e) => {
    loginStore.clearErrors();
    const email = loginStore.email;
    const password = loginStore.password;
    const response = await login({
      variables: { email, password },
      IgnoreResults: false,
    });
    const { ok, errors, token, refreshToken } = response.data.login;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      history.push("/");
    } else {
      errors.forEach(({ path, message }) => {
        loginStore.setField(`${path}Error`, message);
      });
    }
  };

  return (
    <Container text>
      <Header as="h2">Login</Header>
      <Input
        error={!!loginStore.emailError}
        name="email"
        onChange={onChange}
        value={LoginStore.email}
        placeholder="Email"
        fluid
      />
      <Input
        error={!!loginStore.passwordError}
        name="password"
        onChange={onChange}
        value={LoginStore.password}
        placeholder="Password"
        fluid
      />
      <Button onClick={onSubmit}>{loading ? "Loading" : "Log in"}</Button>
      <Button onClick={getLocalStorage}>print localStorage</Button>
    </Container>
  );
});

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
      token
      refreshToken
    }
  }
`;

export default Login;
