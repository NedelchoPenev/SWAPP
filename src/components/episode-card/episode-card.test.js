import React from 'react';
import { shallow } from 'enzyme';

import EpisodeCard from './episode-card.component';

describe('EpisodeCard component', () => {
  let wrapper;
  const mockId = 'episode.1';
  const imageUrl = 'www.testImage.com';
  const mockTitle = 'The Phantom Menace';
  const mockOpeningCrawl = 'Test test test';
  let mockHistory;
  let mockMatch;
  let mockProps;

  beforeEach(() => {
    mockHistory = { push: jest.fn() };
    mockMatch = {
      path: '/episodes',
    };

    mockProps = {
      epsisode: {
        id: mockId,
        title: mockTitle,
        openingCrawl: mockOpeningCrawl,
        image: imageUrl,
      },
      history: mockHistory,
      match: mockMatch,
    };

    wrapper = shallow(<EpisodeCard.WrappedComponent {...mockProps} />);
  });

  it('should render EpisodeCard component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call history.push with the right string when EpisodeCard clicked', () => {
    wrapper.simulate('click');

    expect(mockHistory.push).toHaveBeenCalledWith(
      `${mockMatch.path}/${mockId}`,
    );
  });

  it('should render imageUrl', () => {
    expect(wrapper.find('img').prop('src')).toBe(imageUrl);
  });

  it('should render title', () => {
    expect(wrapper.find('Title').text()).toBe(mockTitle);
  });

  it('should render description', () => {
    expect(wrapper.find('Description').text()).toBe(mockOpeningCrawl);
  });
});
