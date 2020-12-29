import React from "react";
import { Modal, Button, Input, Form } from "semantic-ui-react";
import { withFormik } from "formik";
import { gql, useMutation } from "@apollo/client";

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
    createChannel(teamId: $teamId, name: $name)
  }
`;
const ConnectedAddChannelModal = (props) => {
  const [createChannel] = useMutation(createChannelMutation);
  return <FormikModalWrapper {...props} createChannel={createChannel} />;
};
export default ConnectedAddChannelModal;
