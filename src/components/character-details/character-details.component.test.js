import React from 'react';
import { shallow, mount } from 'enzyme';

import CharacterDetails from './character-details.component';

describe('CharacterDetails component', () => {
  let wrapper;
  const imageUrl = 'www.testImage.com';
  const mockName = 'Obi-Wan Kenobi';
  const mockHeight = '182';
  const mockMass = '77';
  const mockSpecies = {name: 'Human'};
  const mockHomeworld = {name: 'Stewjon'};
  const mockStarships = [{
    node: {
      id: "starships.48",
      image: 'www.testImage.com',
      name: "Starship",
    }
  }]
  let mockHistory;
  let mockProps

  beforeEach(() => {
    mockHistory = { push: jest.fn() };

    mockProps = {
      person: {
        name: mockName,
        image: imageUrl,
        height: mockHeight,
        mass: mockMass,
        species: mockSpecies,
        homeworld: mockHomeworld,
        starships: { edges: mockStarships }
      },
      history: mockHistory
    };

    wrapper = shallow(<CharacterDetails.WrappedComponent {...mockProps} />);
  });

  it('should render CharacterDetails component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call history.push with the right string when StarshipCard clicked', () => {
    wrapper.find('StarshipCard').simulate('click');

    expect(mockHistory.push).toHaveBeenCalledWith(
      `/starships/${mockStarships[0].node.id}`
    );
  });

  it('should render imageUrl if image is available', () => {
    const newWrapper = mount(<CharacterDetails.WrappedComponent {...mockProps}/>)

    expect(newWrapper.props().person.image).toBe(imageUrl);
  });

  it('should render MISSING_IMG if image is not available', () => {
    mockProps = {
      person: {
        name: mockName,
        image: null,
        height: mockHeight,
        mass: mockMass,
        species: mockSpecies,
        homeworld: mockHomeworld,
        starships: { edges: mockStarships }
      },
      history: mockHistory
    };

    const newWrapper = mount(<CharacterDetails.WrappedComponent {...mockProps}/>)

    expect(newWrapper.props().person.image).toBe(null);
  });

  it('should render height if height prop is available', () => {

    expect(wrapper.find('#pointer').length).toBe(4);

    expect(wrapper.find('#content').first().text()).toEqual(mockHeight);
  });

  it('should NOT render if height is NOT available', () => {
    mockProps = {
      person: {
        name: mockName,
        image: imageUrl,
        height: null,
        mass: mockMass,
        species: mockSpecies,
        homeworld: mockHomeworld,
        starships: { edges: mockStarships }
      },
      history: mockHistory
    };

    const newWrapper = shallow(<CharacterDetails.WrappedComponent {...mockProps}/>)

    expect(newWrapper.find('#pointer').length).toBe(3);

    expect(newWrapper.find('#content').first().text()).not.toEqual(mockHeight);
  });

  it('should render weight if mass prop is available', () => {

    expect(wrapper.find('#pointer').length).toBe(4);

    expect(wrapper.find('#content').at(1).text()).toEqual(mockMass);
  });

  it('should NOT render if weight is NOT available', () => {
    mockProps = {
      person: {
        name: mockName,
        image: imageUrl,
        height: mockHeight,
        mass: null,
        species: mockSpecies,
        homeworld: mockHomeworld,
        starships: { edges: mockStarships }
      },
      history: mockHistory
    };

    const newWrapper = shallow(<CharacterDetails.WrappedComponent {...mockProps}/>)

    expect(newWrapper.find('#pointer').length).toBe(3);

    expect(newWrapper.find('#content').at(1).text()).not.toEqual(mockMass);
  });

  it('should render species if species prop is available', () => {

    expect(wrapper.find('#pointer').length).toBe(4);

    expect(wrapper.find('#content').at(2).text()).toEqual(mockSpecies.name);
  });

  it('should NOT render if species is NOT available', () => {
    mockProps = {
      person: {
        name: mockName,
        image: imageUrl,
        height: mockHeight,
        mass: mockMass,
        species: null,
        homeworld: mockHomeworld,
        starships: { edges: mockStarships }
      },
      history: mockHistory
    };

    const newWrapper = shallow(<CharacterDetails.WrappedComponent {...mockProps}/>)

    expect(newWrapper.find('#pointer').length).toBe(3);

    expect(newWrapper.find('#content').at(2).text()).not.toEqual(mockSpecies.name);
  });

  it('should render homeworld if homeworld prop is available', () => {

    expect(wrapper.find('#pointer').length).toBe(4);

    expect(wrapper.find('#content').at(3).text()).toEqual(mockHomeworld.name);
  });

  it('should NOT render if homeworld is NOT available', () => {
    mockProps = {
      person: {
        name: mockName,
        image: imageUrl,
        height: mockHeight,
        mass: mockMass,
        species: mockSpecies,
        homeworld: null,
        starships: { edges: mockStarships }
      },
      history: mockHistory
    };

    const newWrapper = mount(<CharacterDetails.WrappedComponent {...mockProps}/>)

    expect(newWrapper.find('#pointer').length).toBe(3);
    
    expect(newWrapper.props().person.homeworld).toBe(null);
  });
});