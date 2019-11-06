import React from 'react';
import { shallow, mount } from 'enzyme';

import ErrorBoundary from './error-boundary.component';

const Something = () => null;

describe('ErrorBoundary component', () => {
  it('should render ErrorBoundary component', () => {
    const wrapper = shallow(<ErrorBoundary />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should display an ErrorMessage if wrapped component throws', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>,
    );

    const error = new Error('test');

    wrapper.find(Something).simulateError(error);
  });
});
