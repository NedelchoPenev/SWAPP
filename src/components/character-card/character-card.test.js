import React from 'react';
import { shallow, mount } from 'enzyme';

import CharacterCard from './character-card.component'

describe('CharacterCard component', () => {
  let wrapper;
  const imageUrl = 'www.testImage.com';
  const mockName = 'Obi-Wan Kenobi';
  const mockId = 'people.10';
  let mockHistory;
  let mockProps;

  beforeEach(() => {
    mockHistory = { push: jest.fn() };

    mockProps = {
      character: {
        id: mockId,
        name: mockName,
        image: imageUrl
      },
      history: mockHistory
    };

    wrapper = shallow(<CharacterCard.WrappedComponent {...mockProps}/>);
  });

  it('should render CharacterCard component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call history.push with the right string when CharacterCard clicked', () => {
    wrapper.simulate('click');

    expect(mockHistory.push).toHaveBeenCalledWith(
      `/characters/${mockId}`
    );
  });

  it('should render imageUrl', () => {
    expect(wrapper.find("img").prop("src")).toBe(imageUrl);
  });

  it('should render name', () => {
    expect(wrapper.find('h2').text()).toBe(mockName);
  });

  it('should render imageUrl if image is available', () => {
    const newWrapper = mount(<CharacterCard.WrappedComponent {...mockProps}/>)

    expect(newWrapper.props().character.image).toBe(imageUrl);
  });

  it('should render MISSING_IMG if image is not available', () => {
    mockProps = {
      character: {
        id: mockId,
        name: mockName,
        image: null
      },
      history: mockHistory
    };

    const newWrapper = mount(<CharacterCard.WrappedComponent {...mockProps}/>)

    expect(newWrapper.props().character.image).toBe(null);
  });
});