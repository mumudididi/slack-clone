import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Container, Header, Input } from "semantic-ui-react";

const Register = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });
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
    await register({
      variables: { username, password, email },
      ignoreResults: false,
    });
  };

  return (
    <Container text>
      <Header as="h2">Register</Header>
      {error ? <h3>an error has occur during registration</h3> : null}
      {data && data.register === false ? (
        <h3>User not created, please try again</h3>
      ) : null}
      <Input
        name="username"
        onChange={onChange}
        value={userInput.username}
        placeholder="Username"
        fluid
      />
      <Input
        name="email"
        onChange={onChange}
        value={userInput.email}
        placeholder="Email"
        fluid
      />
      <Input
        name="password"
        onChange={onChange}
        value={userInput.password}
        placeholder="Password"
        fluid
      />
      <Button onClick={onSubmit}>{loading ? "Loading" : "Register!"}</Button>
    </Container>
  );
};

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, password: $password, email: $email)
  }
`;

export default Register;
