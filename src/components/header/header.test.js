import React from 'react';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MemoryRouter } from "react-router";

import Header from './header.component';
import { GET_THEME } from '../logo/logo.container';

const mocks = [
  {
    request: {
      query: GET_THEME,
    },
    result: {
      data: {
        theme: 'light'
      }
    }
  }];

const originalError = console.error;

describe('Header component', () => {
  let cache;
  beforeAll(() => {
    console.error = jest.fn();
    cache = new InMemoryCache();
    cache.writeData({
      data: {
        theme: 'light'
      },
    });
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should render Header component', () => {
    const wrapper = shallow(<MockedProvider><Header.WrappedComponent /></MockedProvider>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain sign-out button', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false} cache={cache} resolvers={{}}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </MockedProvider>);

    wrapper.find('OptionLink').at(2).simulate('click');
    expect(wrapper.find('OptionLink').at(2).text()).toContain("sign-out-option.svg");
  });
});