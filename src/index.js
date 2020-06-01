import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";

import Login from "./Components/Login/Login";
import User from "./Components/User/User";
import Nav from "./Components/Nav/Nav";
import Register from "./Components/Register/Register";

const GRAPHQL_ENDPOINT = "fake-askme.herokuapp.com/v1/graphql";

const httpLink = new HttpLink({
  uri: `https://${GRAPHQL_ENDPOINT}`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <CSSReset />
        <Switch>
          <Route path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Nav />
            <Register />
          </Route>
          <Route path="/user">
            <Nav />
            <User />
          </Route>
        </Switch>
      </ThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
);

render(<App />, document.getElementById("root"));
