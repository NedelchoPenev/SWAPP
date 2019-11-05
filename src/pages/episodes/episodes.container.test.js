import React from "react";
import { MemoryRouter } from "react-router";
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';

import EpisodesPageContainer, { GET_ALL_EPISODES } from './episodes.container'
import EpisodesPage from './episodes.component';

import Spinner from '../../components/spinner/spinner.component';

const wait = (time = 0) => new Promise(res => setTimeout(res, time));
const executeMockProviderTestCase = (wrapperInstance) => {
  return wait(100).then(() => wrapperInstance.update());
}

const mocks = [
  {
    request: {
      query: GET_ALL_EPISODES,
      variables: {
        first: 10,
      },
    },
    result: {
      data: {
        allEpisodes: {
          edges: [{
            node: {
              id: '1',
              title: 'Test Title',
              episodeId: 'test.1',
              openingCrawl: 'tete test test',
              image: 'www.test.org'
            }
          }]
        }
      }
    },
  },
];

const originalError = console.error;

describe('CharacterDetails component', () => {
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('renders without error', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <EpisodesPageContainer >
            <EpisodesPage />
          </EpisodesPageContainer>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('should render loading state initially', async () => {
    const component = mount(
      <MockedProvider mocks={[]} >
        <MemoryRouter>
          <EpisodesPageContainer >
            <EpisodesPage />
          </EpisodesPageContainer>
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(component.containsMatchingElement(<Spinner />)).toBeTruthy();
  });

  it('should render CharacterDetails', async () => {
    let component;
    component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <EpisodesPageContainer >
            <EpisodesPage />
          </EpisodesPageContainer>
        </MemoryRouter>
      </MockedProvider>
    );

    return executeMockProviderTestCase(component).then(() => {
      expect(component.find('h1').text()).toEqual('Test Title');
    });
  });
});