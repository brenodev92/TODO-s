import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import './index.css';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BASE_URL } from "./constants/api";

const client = new ApolloClient({
  uri: BASE_URL,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
