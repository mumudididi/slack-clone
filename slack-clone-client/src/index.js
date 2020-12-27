import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";

import "semantic-ui-css/semantic.min.css";

import reportWebVitals from "./reportWebVitals";

const httpLink = createHttpLink({
  uri: "http://localhost:8081/graphiql",
});

const authLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  console.log(" in authLink");
  console.log(operation.getContext().headers);
  operation.setContext({
    headers: {
      ...operation.headers,
      authorization: token ? `Bearer ${token}` : "",
      xtoken: token,
      xrefreshToken: refreshToken,
    },
  });
  return forward(operation);
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("token");
//   const refreshToken = localStorage.getItem("refreshToken");
//   // return the headers to the context so httpLink can read them
//   console.log(" in auth link set context");
//   console.log(headers);
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//       xtoken: token,
//       xrefreshToken: refreshToken,
//     },
//   };
// });

const errorLink = onError(({ operation }) => {
  const headers = operation.getContext().headers;
  console.log(headers);
  const token = headers["Xtoken"];
  const refreshToken = headers["XrefreshToken"];
  if (token) {
    localStorage.setItem("token", token);
  }
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),

  // link: from([authLink, httpLink]),
  // link: from([httpLink]),
  cache: new InMemoryCache(),
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);
// const App = <h1>hiiii</h1>;
ReactDOM.render(App, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
