import express from "express";
import { makeExecutableSchema } from "apollo-server";
import { ApolloServer } from "apollo-server-express";
import { types as typeDefs } from "./typeDefs";
import resolvers from "./resolvers";
import models from "../sequelize";
const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlEndpt = "/graphql";
const server = new ApolloServer({
  schema,
  context: {
    models,
    user: {
      id: 1,
    },
  },
});
server.applyMiddleware({ app, path: graphqlEndpt });
server.applyMiddleware({ app, path: "/graphiql" });

export default app;
