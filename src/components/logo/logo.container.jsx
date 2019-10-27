import React from 'react';
import { useApolloClient, useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import Logo from './logo.component';

const GET_THEME = gql`
  query GetTheme {
    theme @client
  }
`;

const LogoContainer = ({asTitle}) => {
  const {data: {theme}} = useQuery(GET_THEME);
  const client = useApolloClient();

  const setMode = mode => {
    localStorage.setItem('theme', mode)
    client.writeData({ data: { theme: mode } });
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  };

  return <Logo asTitle={asTitle} onClick={() => toggleTheme()}/>
}

export default LogoContainer;