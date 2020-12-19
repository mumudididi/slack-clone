const { gql } = require("apollo-server");

export default gql`
  type Team {
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }

  type Mutation {
    createTeam(name: String!): Boolean!
  }
`;
