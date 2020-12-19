const { gql } = require("apollo-server");

export default gql`
  type Channel {
    id: Int!
    name: String!
    message: [Message!]!
    users: [User!]!
    public: [Boolean!]!
  }

  type Mutation {
    createChannel(
      name: String!
      public: Boolean = false
      teamId: Int!
    ): Boolean!
  }
`;
