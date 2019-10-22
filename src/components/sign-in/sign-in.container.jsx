import React from 'react';
import { useMutation, useApolloClient } from 'react-apollo';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';

import { AUTH_TOKEN } from '../../utils/constants';

import SignIn from './sign-in.component';

const SIGNIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

const SignInContainer = ({ history }) => {
  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_MUTATION, {
    onCompleted(data) {
      _confirm(data);
    },
  });

  const _confirm = async data => {
    _saveUserData(data.signIn.token);
    client.writeData({ data: { isLoggedIn: true } });
    history.push(`/episodes`);
  };

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return <SignIn signIn={signIn} />;
};

export default withRouter(SignInContainer);
