import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import { AUTH_TOKEN } from '../../utils/constants';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

const SIGNIN_MUTATION = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <FormInput
          name="email"
          type="text"
          handleChange={this.handleChange}
          value={this.state.email}
          placeholder="email"
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
        <Mutation
          mutation={SIGNIN_MUTATION}
          variables={{ email, password }}
          onCompleted={data => this._confirm(data)}
        >
          {mutation => <CustomButton onClick={mutation}> Login </CustomButton>}
        </Mutation>
      </div>
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
