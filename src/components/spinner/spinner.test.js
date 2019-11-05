import React from 'react';
import { shallow } from 'enzyme';

import Spinner from './spinner.component'; 

describe('Spinner component', () => {
  it('should render Spinner component', () => {
    const wrapper = shallow(<Spinner />)

    expect(wrapper).toMatchSnapshot();
  })
})