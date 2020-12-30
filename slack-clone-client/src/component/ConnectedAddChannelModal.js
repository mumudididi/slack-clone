import React from "react";
import { Modal, Button, Input, Form } from "semantic-ui-react";
import { withFormik } from "formik";
import { gql, useMutation } from "@apollo/client";
import { allTeamsQuery } from "../utils/sharedQueries";
import findIndex from "lodash/findIndex";

//https://hasura.io/learn/graphql/react/mutations-variables/3-create-mutation/
const AddChannelModal = (props) => {
  const {
    open,
    handleClose,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
  } = props;

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input
              fluid
              value={values.name || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              placeholder="channel name"
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Button onClick={handleSubmit} disabled={isSubmitting} fluid>
              Add
            </Button>
            <Button disabled={isSubmitting} onClick={handleClose} fluid>
              Cancel
            </Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const FormikModalWrapper = withFormik({
  mapPropstoValues: () => ({ name: "" }),
  handleSubmit: async (
    values,
    { props: { createChannel, teamId, handleClose }, setSubmitting }
  ) => {
    const { name } = values;
    try {
      const response = await createChannel({
        variables: { teamId: parseInt(teamId, 10), name: name },
        refetchQueries: [{ query: allTeamsQuery }],
        optimisticResponse: {
          createChannel: {
            __typename: "Mutation",
            ok: true,
            channel: {
              __typename: "Channel",
              id: -1,
              name: name,
              teamId,
            },
          },
        },
      });
      console.log(response);
    } catch (err) {
      console.warn(err);
    }
    setSubmitting(false);
    handleClose();
  },
})(AddChannelModal);

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        id
        name
        teamId
      }
    }
  }
`;
// const updateCahche = (cache, { data: { createChannel } }) => {
//   // console.log(data);
//   // console.log(cache);
//   const { ok, channel } = createChannel;
//   if (!ok) return;
//   const data = cache.readQuery({ query: allTeamsQuery });
//   const teamIdx = findIndex(data.allTeams, ["id", channel.teamId]);
//   console.log(data.allTeams[teamIdx]);
//   const channels = data.allTeams[teamIdx].channels;
//   data.allTeams[teamIdx].channels = [...channels, channel];
//   // cache.writeQuery({ query: allTeamsQuery, data });
// };

const ConnectedAddChannelModal = (props) => {
  const [createChannel] = useMutation(createChannelMutation);
  return <FormikModalWrapper {...props} createChannel={createChannel} />;
};
export default ConnectedAddChannelModal;
