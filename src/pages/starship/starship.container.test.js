import React from "react";
import { MemoryRouter } from "react-router";
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';

import StarshipPageContainer, { GET_STARSHIPS } from './starship.container';
import StarshipPage from './starship.component';

import Spinner from '../../components/spinner/spinner.component';

const wait = (time = 0) => new Promise(res => setTimeout(res, time));
const executeMockProviderTestCase = (wrapperInstance) => {
  return wait(100).then(() => wrapperInstance.update());
}

const mocks = [
  {
    request: {
      query: GET_STARSHIPS,
      variables: {
        id: 'starships.39', 
        first: 40,
      },
    },
    result: {
      data: {
        starship: {
          id: 'starships.39',
          name: 'Naboo fighter',
          image: 'www.test-image.com',
          model: 'N-1 starfighter',
          starshipClass: 'starfighter',
          cost: '200000',
          maxAtmosphericSpeed: '1100',
          maxMLPerHour: '12',
          hyperdriveRating: '1',
          crew: '1'
        },
        allStarships: {
          edges: [{
            node: {
              id: 'starships.39',
              cost: '200000',
              maxAtmosphericSpeed: '1100',
              maxMLPerHour: '12',
              hyperdriveRating: '1',
              crew: '1',
              starshipClass: 'starfighter',
            }
          }, 
          {
            node: {
              id: 'starships.29',
              cost: '2',
              maxAtmosphericSpeed: '11',
              maxMLPerHour: '120',
              hyperdriveRating: '10',
              crew: '10',
              starshipClass: 'starfighter',
            }
          },
          {
            node: {
              id: 'starships.9',
              cost: '20',
              maxAtmosphericSpeed: '110',
              maxMLPerHour: '1278',
              hyperdriveRating: '17',
              crew: '17',
              starshipClass: 'capital ship'
            }
          }
        ]
        }
      }
    },
  },
];

const mockProps = {
  match: {
    params: {
      starshipId: 'starships.39'
    }
  }
}

const originalError = console.error;

describe('StarshipPageContainer component', () => {
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
          <StarshipPageContainer {...mockProps}>
            <StarshipPage />
          </StarshipPageContainer>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('should render loading state initially', async () => {
    const component = mount(
      <MockedProvider mocks={[]} >
        <MemoryRouter>
          <StarshipPageContainer {...mockProps}>
            <StarshipPage />
          </StarshipPageContainer>
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(component.containsMatchingElement(<Spinner />)).toBeTruthy();
  });

  it('should render StarshipPage', async () => {
    let component;
    component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <StarshipPageContainer {...mockProps}>
            <StarshipPage />
          </StarshipPageContainer>
        </MemoryRouter>
      </MockedProvider>
    );

    return executeMockProviderTestCase(component).then(() => {
      expect(component.find('h1').text()).toEqual('Naboo fighter');
    });
  });
});