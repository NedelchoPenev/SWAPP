import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

import { AUTH_TOKEN } from './utils/constants';

import App from './App';

import './index.css';

const httpLink = createHttpLink({
  uri: 'http://softuni-swapp-212366186.eu-west-1.elb.amazonaws.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  // typeDefs,
  // resolvers
});

// client.writeData({ data });

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);
