import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import {
  Form,
  Message,
  Button,
  Container,
  Header,
  Input,
} from "semantic-ui-react";

const CreateTeam = () => {
  const [team, setTeam] = useState({
    name: "",
  });
  const [createTeamErrors, setErrors] = useState({
    nameError: "",
  });

  const history = useHistory();

  // structure of data : { register: {ok: false, errors: [(),()...]}}
  const [createTeam, { data, loading, error }] = useMutation(
    createTeamMutation
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    setTeam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { name } = team;
    let response = null;
    try {
      response = await createTeam({
        variables: { name },
        ignoreResults: false,
      });
    } catch (error) {
      console.log("in erorr redirection");
      console.log(error);
      history.push("/login");
      return;
    }
    const { ok, errors } = response.data.createTeam;
    const res_team = response.data.createTeam.team;
    console.log(response.data);
    if (ok) {
      history.push(`/view-team/${res_team.id}`);
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      setErrors(err);
    }
  };

  return (
    <Container text>
      <Header as="h2">Create A Team</Header>
      {error ? <h3>an unkown error has occur during registration</h3> : null}
      <Form>
        <Form.Field
          control={Input}
          name="name"
          value={team.name}
          placeholder="name"
          error={!!createTeamErrors.nameError}
          onChange={onChange}
          fluid
        />
        <Form.Field>
          <Button onClick={onSubmit}>
            {loading ? "Loading" : "Register!"}
          </Button>
        </Form.Field>
      </Form>

      {createTeamErrors.nameError ? (
        <Message
          error
          header="There is something wrong with your registration"
          list={Object.values(createTeamErrors)}
        />
      ) : null}
    </Container>
  );
};

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
      team {
        id
      }
    }
  }
`;

export default CreateTeam;
