import React from 'react';
import { shallow } from 'enzyme';

import CharactersPage from './characters.component';
import CustomButton from '../../components/custom-button/custom-button.component';

describe('CharactersPage component', () => {

  it('should render CharactersPage component', () => {
    const mockProps = {
      people: {
        edges: [{
          node: {
            id: 1
          }
        }],
        pageInfo: {
          hasNextPage: true
        }
      }
    }
    expect(shallow(<CharactersPage {...mockProps}/>)).toMatchSnapshot();
  });

  it('should NOT render CustomButton component', () => {
    const mockProps = {
      people: {
        edges: [{
          node: {
            id: 1
          }
        }],
        pageInfo: {
          hasNextPage: false
        }
      }
    }
    expect(shallow(<CharactersPage {...mockProps}/>).find(CustomButton)).toEqual({});
  });
});