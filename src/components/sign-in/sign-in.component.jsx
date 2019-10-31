import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import LogoContainer from '../logo/logo.container';

import { ErrorMessage, SignInContainer, FormContainer } from './sign-in.styles';

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.signIn({
      variables: { email: this.state.email, password: this.state.password },
    });
  };

  render() {
    return (
      <SignInContainer>
        <LogoContainer asTitle={true} />
        <FormContainer>
          {this.props.error
            ? this.props.error.graphQLErrors.map(({ message }, i) => (
                <ErrorMessage key={i}>{message}</ErrorMessage>
              ))
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
            <CustomButton type="submit" id='form-button'> Login </CustomButton>
          </form>
        </FormContainer>
        <p><span>Email: </span>demo@st6.io</p>
        <p><span>Password: </span>demo1234</p>
      </SignInContainer>
    );
  }
}

export default SignIn;
