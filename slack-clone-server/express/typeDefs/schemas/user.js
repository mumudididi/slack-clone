const { gql } = require("apollo-server");
// CRUD principle
// Create
// Read
// Update
// Delete
export default gql`
  type User {
    id: Int!
    email: String!
    username: String!
    team: [Team!]!
  }

  type Mutation {
    createUser(username: String!, password: String!, email: String!): User!
  }
  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }
`;
