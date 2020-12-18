import express from "express";
const { makeExecutableSchema, gql } = require("apollo-server");
const { ApolloServer } = require("apollo-server-express");
import sequelize from "./sequelize";

const PORT = 8080;

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

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    sequelize.authenticate().then(() => {
      console.log("Database connection OK!");
    });
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();
}

init();

sequelize.sync({ force: true }).then(() => {
  app.listen(8081);
});
