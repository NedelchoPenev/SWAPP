import React from 'react';
import { shallow } from 'enzyme';

import Radar from './radar.component';

describe('Radar component', () => {
  it('should render Radar component', () => {
    expect(shallow(<Radar />)).toMatchSnapshot();
  });
});
