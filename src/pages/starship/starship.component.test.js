import React from 'react';
import { shallow } from 'enzyme';

import StarshipPage from './starship.component';

describe('StarshipPage component', () => {

  it('should render StarshipPage component', () => {
    const mockProps = {
      starship: {
        name: 'Test name',
        model: 'Test model'
      }
      
    }
    expect(shallow(<StarshipPage {...mockProps}/>)).toMatchSnapshot();
  });
});