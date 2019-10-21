import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

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
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.signIn({ variables: { email, password } });
          }}
        >
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
          <CustomButton type="submit"> Login </CustomButton>
        </form>
      </div>
    );
  }
}

export default SignIn;
