import React from "react";
import { MemoryRouter } from "react-router";
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';

import CharacterDetailsContainer, { GET_PERSON } from './character-details.container';
import CharacterDetails from './character-details.component';

import Spinner from '../spinner/spinner.component';

const wait = (time = 0) => new Promise(res => setTimeout(res, time));
const executeMockProviderTestCase = (wrapperInstance) => {
  return wait(100).then(() => wrapperInstance.update());
}

const mocks = [
  {
    request: {
      query: GET_PERSON,
      variables: {
        id: 'people.11',
      },
    },
    result: {
      data: {
        person: {
          name: 'Test Name',
          image: 'www.test-image.com',
          height: '189',
          mass: '66',
          species: {
            name: 'Test Species Name'
          },
          homeworld: {
            name: 'Teat Homeworld Name'
          },
          starships: {
            edges: [{
              node: {
                id: 'starship.44',
                name: 'Test Starship Name',
                image: 'www.test-image.com'
              }
            }]
          }
        },
      },
    },
  },
];

const mockProps = {
  match: {
    params: {
      characterId: 'people.11'
    }
  }
}

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
          <CharacterDetailsContainer {...mockProps} >
            <CharacterDetails />
          </CharacterDetailsContainer>
        </MemoryRouter>
      </MockedProvider>,
    );
  });

  it('should render loading state initially', async () => {
    const component = mount(
      <MockedProvider mocks={[]} >
        <MemoryRouter>
          <CharacterDetailsContainer {...mockProps} >
            <CharacterDetails />
          </CharacterDetailsContainer>
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
          <CharacterDetailsContainer {...mockProps} >
            <CharacterDetails />
          </CharacterDetailsContainer>
        </MemoryRouter>
      </MockedProvider>,
    );

    return executeMockProviderTestCase(component).then(() => {
      expect(component.find('h1').text()).toEqual('Test Name');
    });
  });
});