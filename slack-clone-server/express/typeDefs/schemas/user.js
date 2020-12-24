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

  type registerResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }
  type Mutation {
    register(
      username: String!
      password: String!
      email: String!
    ): registerResponse!
  }
  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }
`;
