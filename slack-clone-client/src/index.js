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
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//       xtoken: token,
//       xrefreshToken: refreshToken,
//     },
//   };
// });

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    const { headers } = operation.getContext();
    const token = headers["xtoken"];
    const refreshToken = headers["xrefreshToken"];
    if (token) {
      localStorage.setItem("token", token);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    return forward(operation);
  }
);

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
