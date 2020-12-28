import express from "express";
import { makeExecutableSchema } from "apollo-server";
import { ApolloServer } from "apollo-server-express";
import { types as typeDefs } from "./typeDefs";
import resolvers from "./resolvers";
import models from "../sequelize";
import cors from "cors";
import jwt from "jsonwebtoken";
import { refreshTokens } from "./auth";
const app = express();
app.use(cors("*"));
const SECRET = "lafoweodfepqicuewu";
const SECRET2 = "kldsfkamdnvalsjflgtwwq";
const addUser = async (req, res, next) => {
  const token = req.headers.xtoken;
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (e) {
      const refreshToken = req.headers.xrefreshToken;
      const newTokens = await refreshTokens(
        refreshToken,
        models,
        SECRET,
        SECRET2
      );
      if (newTokens.token && newTokens.refreshToken) {
        res.set("Access-Control-Expose-Headers", "xtoken,xrefreshToken");
        res.set("xtoken", newTokens.token);
        res.set("xrefresToken", newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlEndpt = "/graphql";
const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    return {
      models,
      user: req.user,
      SECRET,
      SECRET2,
    };
  },
});
server.applyMiddleware({ app, path: graphqlEndpt });
server.applyMiddleware({ app, path: "/graphiql" });

export default app;
