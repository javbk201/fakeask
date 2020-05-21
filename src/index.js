import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { render } from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";


import Login from "./Components/Login/Login";
import Profile from "./Components/Profile/Profile";
import Nav from "./Components/Nav/Nav";
import Ask from "./Components/Ask/Ask";
import Questions from "./Components/Questions/Questions";
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


const login = false;
const register = false;

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider>
      <CSSReset />
        <Nav />
        {login ?
          <ThemeProvider>
            <Profile />
            <Ask />
            <Questions />
          </ThemeProvider>
        : (!register ? <Login /> : <Register />)
        }
    </ThemeProvider>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
