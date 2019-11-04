import React from 'react';
import { shallow } from 'enzyme';

import StarshipDetails from './starship-details.component';

describe('StarshipDetails component', () => {
  let wrapper;
  const mockName = 'Jedi starfighter';
  const imageUrl = 'www.testImage.com';
  const mockClass = 'starfighter';
  const mockCost = '180000';
  const mockMaxAtmosphericSpeed = '1150';
  const mockHyperdriveRating = '1';
  const mockCrew = '10';
  let mockProps

  beforeEach(() => {
    mockProps = {
      starship: {
        name: mockName,
        image: imageUrl,
        starshipClass: mockClass,
        cost: mockCost,
        maxAtmosphericSpeed: mockMaxAtmosphericSpeed,
        hyperdriveRating: mockHyperdriveRating,
        crew: mockCrew,
      }
    };

    wrapper = shallow(<StarshipDetails {...mockProps} />);
  })

  it('should render StarshipDetails component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render starshipClass if starshipClass prop is available', () => {

    expect(wrapper.find('#pointer').length).toBe(5);

    expect(wrapper.find('#content').first().text()).toEqual(mockClass);
  });

  it('should NOT render if starshipClass is NOT available', () => {
    mockProps = {
      starship: {
        name: mockName,
        image: imageUrl,
        starshipClass: null,
        cost: mockCost,
        maxAtmosphericSpeed: mockMaxAtmosphericSpeed,
        hyperdriveRating: mockHyperdriveRating,
        crew: mockCrew,
      }
    };

    wrapper.setProps(mockProps)

    expect(wrapper.find('#pointer').length).toBe(4);

    expect(wrapper.find('#content').first().text()).not.toEqual(mockClass);
  });

  it('should render cost if cost prop is available', () => {

    expect(wrapper.find('#pointer').length).toBe(5);

    expect(wrapper.find('#content').at(1).text()).toEqual(`${mockCost} credits`);
  });

  it('should render 0 credits if cost is NOT available', () => {
    mockProps = {
      starship: {
        name: mockName,
        image: imageUrl,
        starshipClass: mockClass,
        cost: null,
        maxAtmosphericSpeed: mockMaxAtmosphericSpeed,
        hyperdriveRating: mockHyperdriveRating,
        crew: mockCrew,
      }
    };

    wrapper.setProps(mockProps)

    expect(wrapper.find('#content').at(1).text()).toEqual('0 credits');
  });

  it('should render crew if crew prop is available', () => {

    expect(wrapper.find('#pointer').length).toBe(5);

    expect(wrapper.find('#content').at(2).text()).toEqual(mockCrew);
  });

  it('should NOT render if crew is NOT available', () => {
    mockProps = {
      starship: {
        name: mockName,
        image: imageUrl,
        starshipClass: mockClass,
        cost: mockCost,
        maxAtmosphericSpeed: mockMaxAtmosphericSpeed,
        hyperdriveRating: mockHyperdriveRating,
        crew: null,
      }
    };

    wrapper.setProps(mockProps)

    expect(wrapper.find('#pointer').length).toBe(4);

    expect(wrapper.find('#content').at(2).text()).not.toEqual(mockCrew);
  });

  it('should render maxAtmosphericSpeed if maxAtmosphericSpeed prop is available', () => {

    expect(wrapper.find('#pointer').length).toBe(5);

    expect(wrapper.find('#content').at(3).text()).toEqual(mockMaxAtmosphericSpeed);
  });

  it('should NOT render if maxAtmosphericSpeed is NOT available', () => {
    mockProps = {
      starship: {
        name: mockName,
        image: imageUrl,
        starshipClass: mockClass,
        cost: mockCost,
        maxAtmosphericSpeed: null,
        hyperdriveRating: mockHyperdriveRating,
        crew: mockCrew,
      }
    };

    wrapper.setProps(mockProps)

    expect(wrapper.find('#pointer').length).toBe(4);

    expect(wrapper.find('#content').at(3).text()).not.toEqual(mockMaxAtmosphericSpeed);
  });

  it('should render hyperdriveRating if hyperdriveRating prop is available', () => {

    expect(wrapper.find('#pointer').length).toBe(5);

    expect(wrapper.find('#content').at(4).text()).toEqual(mockHyperdriveRating);
  });

  it('should NOT render if hyperdriveRating is NOT available', () => {
    mockProps = {
      starship: {
        name: mockName,
        image: imageUrl,
        starshipClass: mockClass,
        cost: mockCost,
        maxAtmosphericSpeed: mockMaxAtmosphericSpeed,
        hyperdriveRating: null,
        crew: mockCrew,
      }
    };

    wrapper.setProps(mockProps)

    expect(wrapper.find('#pointer').length).toBe(4);

    expect(wrapper.find('#content').at(4)).toEqual({});
  });
});