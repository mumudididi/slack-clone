const { gql } = require("apollo-server");
export default gql`
  type Error {
    path: String!
    message: String
  }
`;
