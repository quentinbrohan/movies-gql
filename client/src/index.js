import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "src/components/App";

const client = new ApolloClient({
  link: createHttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
  dataIdFromObject: (object) => object.id,
});

const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);
const target = document.getElementById("root");
render(<Root />, target);
