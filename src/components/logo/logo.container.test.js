import React from 'react';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { mount } from 'enzyme';

import LogoContainer from './logo.container';
import Logo from './logo.component';

import { GET_THEME } from './logo.container';

const mocks = [
  {
    request: {
      query: GET_THEME,
    },
    result: {
      data: {
        theme: 'light',
      },
    },
  },
];

const originalError = console.error;

describe('LogoContainer component', () => {
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should change theme to dark on click', async () => {
    const cache = new InMemoryCache();
    cache.writeData({
      data: {
        theme: 'light',
      },
    });
    const component = mount(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        cache={cache}
        resolvers={{}}
      >
        <MemoryRouter>
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </MemoryRouter>
      </MockedProvider>,
    );

    component.find('LogoStyle').simulate('click');
    expect(cache.data.data.ROOT_QUERY.theme).toBe('dark');
  });

  it('should change theme to light on click', async () => {
    const cache = new InMemoryCache();
    cache.writeData({
      data: {
        theme: 'dark',
      },
    });
    const component = mount(
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        cache={cache}
        resolvers={{}}
      >
        <MemoryRouter>
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </MemoryRouter>
      </MockedProvider>,
    );

    component.find('LogoStyle').simulate('click');
    expect(cache.data.data.ROOT_QUERY.theme).toBe('light');
  });
});
