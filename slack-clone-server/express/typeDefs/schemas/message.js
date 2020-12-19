const { gql } = require("apollo-server");

export default gql`
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
  }

  type Mutation {
    createMessage(channelId: Int!, text: String!): Boolean!
  }
`;
