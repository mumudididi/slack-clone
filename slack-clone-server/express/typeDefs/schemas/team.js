const { gql } = require("apollo-server");

export default gql`
  type Team {
    id: Int!
    name: String!
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }

  type Query {
    allTeams: [Team]!
  }
  type createTeamResponse {
    ok: Boolean!
    errors: [Error!]
    team: Team
  }
  type Mutation {
    createTeam(name: String!): createTeamResponse!
  }
`;
