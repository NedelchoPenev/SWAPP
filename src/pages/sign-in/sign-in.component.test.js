import React from 'react';
import { shallow } from 'enzyme';

import SignIn from './sign-in.component';
import FormInput from '../../components/form-input/form-input.component';

describe('SignIn component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignIn />);
  });

  it('should render SignIn component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleChange on change event', () => {
    const event = {
      target: {
        name: 'email',
        value: 'test'
      }
    };

    wrapper.find(FormInput).at(0).prop('handleChange')(event)
    expect(wrapper.state('email')).toBe('test');
  });

  it('should call onSubmit when submit button clicked', () => {
    const preventDefault = { preventDefault: () => {} };
    wrapper.setProps({signIn: jest.fn()});
    wrapper.find('form').simulate('submit', preventDefault);
    expect(wrapper.state('submitted')).toBe(true);
  });

  it('should NOT show error message with right credentials', () => {
    wrapper.setProps({
      error: false
    })

    expect(wrapper.find('ErrorMessage')).toEqual({});
  });

  it('should show error message with wrong credentials', () => {
    wrapper.setProps({
      error: {
        graphQLErrors: [{
          message: 'test'
        }]
      }
    })

    expect(wrapper.find('ErrorMessage').at(0).text()).toBe('test');
  });
});