import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {
  Message,
  Button,
  Container,
  Header,
  Input,
  FormInput,
} from "semantic-ui-react";

const Register = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formStatus, setFormStatus] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });

  const history = useHistory();

  // structure of data : { register: {ok: false, errors: [(),()...]}}
  const [register, { data, loading, error }] = useMutation(registerMutation);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, password, email } = userInput;
    const response = await register({
      variables: { username, password, email },
      ignoreResults: false,
    });
    const { ok, errors } = response.data.register;
    if (ok) {
      history.push("/");
    } else {
      const err = {};
      console.log(errors);
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      console.log(err);
      setFormStatus(err);
    }
    setUserInput({
      username: "",
      email: "",
      password: "",
    });
  };
  // const errList = () => {
  //   const err = [];
  //   console.log("here");
  //   for (const msg in formStatus) {
  //     if (msg) {
  //       console.log("on submit");
  //       console.log(msg);
  //       err.push(msg);
  //     }
  //   }
  //   return err;
  // };

  return (
    <Container text>
      <Header as="h2">Register</Header>
      {error ? <h3>an unkown error has occur during registration</h3> : null}
      <Input
        error={!!formStatus.usernameError}
        name="username"
        onChange={onChange}
        value={userInput.username}
        placeholder="Username"
        fluid
      />
      <Input
        error={!!formStatus.emailError}
        name="email"
        onChange={onChange}
        value={userInput.email}
        placeholder="Email"
        fluid
      />
      <Input
        error={!!formStatus.passwordError}
        name="password"
        onChange={onChange}
        value={userInput.password}
        placeholder="Password"
        fluid
      />
      <Button onClick={onSubmit}>{loading ? "Loading" : "Register!"}</Button>
      {formStatus.usernameError ||
      formStatus.passwordError ||
      formStatus.emailError ? (
        <Message
          error
          header="There is something wrong with your registration"
          list={Object.values(formStatus)}
        />
      ) : null}
    </Container>
  );
};

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, password: $password, email: $email) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default Register;
