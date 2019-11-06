import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';

import CustomButton from '../../components/custom-button/custom-button.component';
import FormInput from '../../components/form-input/form-input.component';
import LogoContainer from '../../components/logo/logo.container';

import { AUTH_TOKEN } from '../../utils/constants';

import { ErrorMessage, SignInContainer, FormContainer } from './sign-in.styles';

export const SIGNIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
    isLoggedIn: false,
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({ isLoggedIn: true });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={{ email, password }}
        onCompleted={data => this._confirm(data)}
      >
        {(mutation, { error }) => (
          <SignInContainer>
            <LogoContainer asTitle={true} />
            <FormContainer>
              {error
                ? error.graphQLErrors.map(({ message }, i) => {
                    return <ErrorMessage key={i}>{message}</ErrorMessage>;
                  })
                : null}
              <form onSubmit={this.onSubmit}>
                <FormInput
                  name="email"
                  type="text"
                  handleChange={this.handleChange}
                  value={this.state.email}
                  placeholder="Email"
                  required
                />
                <FormInput
                  name="password"
                  type="password"
                  value={this.state.password}
                  handleChange={this.handleChange}
                  placeholder="Password"
                  required
                />

                <CustomButton type="submit" id="form-button" onClick={mutation}>
                  {' '}
                  Login{' '}
                </CustomButton>
              </form>
            </FormContainer>
            <p>
              <span>Email: </span>demo@st6.io
            </p>
            <p>
              <span>Password: </span>demo1234
            </p>
          </SignInContainer>
        )}
      </Mutation>
    );
  }

  _confirm = async data => {
    this._saveUserData(data.signIn.token);
    this.props.history.push(`/episodes`);
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default withRouter(SignIn);
