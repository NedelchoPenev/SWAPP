import React from 'react';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';

import EpisodePageContainer, { GET_EPISODE } from './episode.container';
import EpisodePage from './episode.component';

import Spinner from '../../components/spinner/spinner.component';

const wait = (time = 0) => new Promise(res => setTimeout(res, time));
const executeMockProviderTestCase = wrapperInstance => {
  return wait(100).then(() => wrapperInstance.update());
};

const mocks = [
  {
    request: {
      query: GET_EPISODE,
      variables: {
        id: 'films.4',
        first: 5,
      },
    },
    result: {
      data: {
        episode: {
          id: 1,
          title: 'Test Title',
          episodeId: 'films.4',
          openingCrawl: 'Test trst test',
          image: 'www.test-image.com',
          director: 'Test Director',
          releaseDate: '1999-05-19',
          people: {
            edges: [
              {
                node: {
                  id: 'person.1',
                  name: 'Test Name',
                  image: 'www.test-image.com',
                },
              },
            ],
            pageInfo: {
              hasNextPage: true,
              endCursor: 'test',
            },
          },
        },
      },
    },
  },
];

const mockProps = {
  match: {
    params: {
      episodeId: 'films.4',
    },
  },
};

const originalError = console.error;

describe('EpisodePageContainer component', () => {
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
          <EpisodePageContainer {...mockProps}>
            <EpisodePage />
          </EpisodePageContainer>
        </MemoryRouter>
      </MockedProvider>,
    );
  });

  it('should render loading state initially', async () => {
    const component = mount(
      <MockedProvider mocks={[]}>
        <MemoryRouter>
          <EpisodePageContainer {...mockProps}>
            <EpisodePage />
          </EpisodePageContainer>
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(component.containsMatchingElement(<Spinner />)).toBeTruthy();
  });

  it('should render EpisodePage', async () => {
    const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <EpisodePageContainer {...mockProps}>
            <EpisodePage />
          </EpisodePageContainer>
        </MemoryRouter>
      </MockedProvider>,
    );

    return executeMockProviderTestCase(component).then(() => {
      expect(
        component
          .find('h2')
          .first()
          .text(),
      ).toEqual('Test Title');
    });
  });
});
