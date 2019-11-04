import React from 'react';
import { shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import Header from './header.component';

describe('Header component', () => {
  it('should render Header component', () => {
    const wrapper = shallow(<Header.WrappedComponent />)

    expect(wrapper).toMatchSnapshot();
  });

  it('should ', () => {
    
  });
});