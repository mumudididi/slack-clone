import express from "express";
import { makeExecutableSchema } from "apollo-server";
import { ApolloServer } from "apollo-server-express";
import { types as typeDefs } from "./typeDefs";
import resolvers from "./resolvers";
import models from "../sequelize";
import cors from "cors";
const app = express();
app.use(cors("*"));

const SECRET = "lafoweodfepqicuewu";
const SECRET2 = "kldsfkamdnvalsjflgtwwq";
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
    SECRET,
    SECRET2,
  },
});
server.applyMiddleware({ app, path: graphqlEndpt });
server.applyMiddleware({ app, path: "/graphiql" });

export default app;
