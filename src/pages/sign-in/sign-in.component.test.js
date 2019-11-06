import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GraphQLError } from 'graphql';
import wait from 'waait';

import SignIn, { SIGNIN_MUTATION } from './sign-in.component';
import FormInput from '../../components/form-input/form-input.component';

let mutationWasCalled = false;
const mocks = [
  {
    request: {
      query: SIGNIN_MUTATION,
      variables: { email: 'email', password: 'password' },
    },
    result: () => {
      mutationWasCalled = true;
      return {
        data: {
          signIn: {
            token: 'testtoken777',
            __typename: 'Token',
          },
        },
        error: [new GraphQLError('error occurred')],
      };
    },
  },
];

const cache = new InMemoryCache();
cache.writeData({
  data: {
    theme: 'light',
  },
});

const originalError = console.error;

describe('SignIn component', () => {
  let wrapper;

  const mockProps = {
    history: { push: jest.fn() },
  };

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    wrapper = mount(
      <MockedProvider
        mocks={mocks}
        cache={cache}
        resolvers={{}}
        childProps={mockProps}
      >
        <SignIn.WrappedComponent />
      </MockedProvider>,
    );
  });

  it('should render SignIn component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleChange on change event', () => {
    const event = {
      target: {
        name: 'email',
        value: 'test',
      },
    };

    wrapper
      .find(FormInput)
      .first()
      .simulate('change', event);
    expect(wrapper.find('SignIn').state('email')).toBe('test');
  });

  it('should call onSubmit when submit button clicked', () => {
    const preventDefault = { preventDefault: () => {} };
    wrapper.find('form').simulate('submit', preventDefault);
    expect(wrapper.find('SignIn').state('isLoggedIn')).toBe(true);
  });

  it('should NOT show error message with right credentials', () => {
    expect(wrapper.find('ErrorMessage')).toEqual({});
  });

  it('renders without error', () => {
    mount(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        cache={cache}
        resolvers={{}}
      >
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </MockedProvider>,
    );
  });

  it('should SignIn', async () => {
    const component = mount(
      <MockedProvider mocks={mocks} cache={cache} resolvers={{}}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </MockedProvider>,
    );

    component
      .find('SignIn')
      .instance()
      .setState({ email: 'email', password: 'password' });
    component.find('CustomButton').simulate('click');

    await wait(0);
    expect(mutationWasCalled).toBe(true);
  });
});
