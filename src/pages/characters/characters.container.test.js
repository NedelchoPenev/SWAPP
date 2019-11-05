import React from "react";
import { MemoryRouter } from "react-router";
import { MockedProvider } from '@apollo/react-testing';
import { mount } from 'enzyme';

import CharactersPageContainer, { GET_ALL_CHARACTERS } from './characters.container';
import CharactersPage from './characters.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import Spinner from '../../components/spinner/spinner.component';

const wait = (time = 0) => new Promise(res => setTimeout(res, time));
const executeMockProviderTestCase = async (wrapperInstance) => {
  await wait(100);
  return wrapperInstance.update();
}

// let onLoadMore = false;

const mocks = [
  {
    request: {
      query: GET_ALL_CHARACTERS,
      variables: {
        first: 12
      },
    },
    result: {
      data: {
        allPeople: {
          edges: [{
            node: {
              id: 'people.1',
              name: 'Test Name1',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3BsZS4x"
          }, {
            node: {
              id: 'people.2',
              name: 'Test Name2',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3BsZS12"
          }, {
            node: {
              id: 'people.3',
              name: 'Test Name3',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3BsZS4x3"
          }, {
            node: {
              id: 'people.4',
              name: 'Test Name4',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3BsZS124"
          }, {
            node: {
              id: 'people.5',
              name: 'Test Name5',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3Bsas125"
          }, {
            node: {
              id: 'people.6',
              name: 'Test Name6',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3Bsasdf==6"
          }, {
            node: {
              id: 'people.7',
              name: 'Test Name7',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3BsZS4x7"
          }, {
            node: {
              id: 'people.8',
              name: 'Test Name8',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3BsZS128"
          }, {
            node: {
              id: 'people.9',
              name: 'Test Name9',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3BsZS4x39"
          }, {
            node: {
              id: 'people.10',
              name: 'Test Name10',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3BsZS12410"
          }, {
            node: {
              id: 'people.11',
              name: 'Test Name11',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3Bsas12511"
          }, {
            node: {
              id: 'people.12',
              name: 'Test Name12',
              image: 'www.test-image.com'
            },
            cursor: "Y3Vyc29yLnBlb3Bsasdf==612"
          }],
          pageInfo: {
            endCursor: 'Y3Vyc29yLnBlb3Bsasdf==612',
            hasNextPage: true
          }
        }
      }
    }
  },
  {
    request: {
      query: GET_ALL_CHARACTERS,
      variables: {
        first: 12,
        after: 'Y3Vyc29yLnBlb3Bsasdf==612'
      },
    },

    result: () => {
      // onLoadMore = true
      return {
        data: {
          allPeople: {
            edges: [
              {
                node: {
                  id: 'people.1',
                  name: 'Test Name1',
                  image: 'www.test-image.com'
                },
                cursor: "Y3Vyc29yLnBlb3BsZS4x"
              }, {
                node: {
                  id: 'people.2',
                  name: 'Test Name2',
                  image: 'www.test-image.com'
                },
                cursor: "Y3Vyc29yLnBlb3BsZS12"
              }, {
                node: {
                  id: 'people.3',
                  name: 'Test Name3',
                  image: 'www.test-image.com'
                },
                cursor: "Y3Vyc29yLnBlb3Bsas12"
              }, {
                node: {
                  id: 'people.4',
                  name: 'Test Name4',
                  image: 'www.test-image.com'
                },
                cursor: "Y3Vyc29yLnBlb3Bsasdf=="
              }],
            pageInfo: {
              endCursor: 'Y3Vyc29yLnBlb3Bsasdf==',
              hasNextPage: false
            }
          }
        }
      }
    }
  }
];

const originalError = console.error;

describe('CharactersPageContainer component', () => {
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
          <CharactersPageContainer >
            <CharactersPage />
          </CharactersPageContainer>
        </MemoryRouter>
      </MockedProvider>
    );
  });

  it('should render loading state initially', () => {
    const component = mount(
      <MockedProvider mocks={[]} >
        <MemoryRouter>
          <CharactersPageContainer >
            <CharactersPage />
          </CharactersPageContainer>
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(component.containsMatchingElement(<Spinner />)).toBeTruthy();
  });

  it('should render CharactersPage', async () => {
    const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <CharactersPageContainer >
            <CharactersPage />
          </CharactersPageContainer>
        </MemoryRouter>
      </MockedProvider>
    );

    await executeMockProviderTestCase(component);
    expect(component.find('h2').first().text()).toEqual('Test Name1');
  });

  it('should fetch more data on button click', async () => {
    const component = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <CharactersPageContainer >
            <CharactersPage />
          </CharactersPageContainer>
        </MemoryRouter>
      </MockedProvider>
    );

    return executeMockProviderTestCase(component).then(() => {
      component.find(CustomButton).simulate('click');
      // expect(onLoadMore).toBe(true);
    })
  });
});