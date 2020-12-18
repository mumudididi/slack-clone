import express from "express";
const { makeExecutableSchema, gql } = require("apollo-server");
const { ApolloServer } = require("apollo-server-express");

const app = express();
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlEndpt = "/graphql";
const server = new ApolloServer({ schema });
server.applyMiddleware({ app, path: graphqlEndpt });
server.applyMiddleware({ app, path: "/graphiql" });

export default app;
