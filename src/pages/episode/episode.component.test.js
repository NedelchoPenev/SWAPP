import React from 'react';
import { shallow } from 'enzyme';

import EpisodePage from './episode.component';
import CustomButton from '../../components/custom-button/custom-button.component';

describe('EpisodePage component', () => {
  const mockId = 'films.4';
  const mockTitle = 'The Phantom Menace';
  const mockOpeningCrawl = 'Test test test';
  const imageUrl = 'www.testImage.com';
  const mockDirector = 'George Lucas';
  const mockReleaseDate = '1999-05-19';
  const mockPeopleHasNextPage = {
    edges: [
      {
        node: {
          id: 'test',
        },
      },
    ],
    pageInfo: {
      hasNextPage: true,
    },
  };
  const mockPeopleNONextPage = {
    edges: [
      {
        node: {
          id: 'test',
        },
      },
    ],
    pageInfo: {
      hasNextPage: false,
    },
  };

  it('should render EpisodePage component', () => {
    const mockProps = {
      episode: {
        episodeId: mockId,
        title: mockTitle,
        openingCrawl: mockOpeningCrawl,
        image: imageUrl,
        director: mockDirector,
        releaseDate: mockReleaseDate,
        people: mockPeopleHasNextPage,
      },
    };

    expect(shallow(<EpisodePage {...mockProps} />)).toMatchSnapshot();
  });

  it('should NOT render button component if hasNextPage is false', () => {
    const mockProps = {
      episode: {
        episodeId: mockId,
        title: mockTitle,
        openingCrawl: mockOpeningCrawl,
        image: imageUrl,
        director: mockDirector,
        releaseDate: mockReleaseDate,
        people: mockPeopleNONextPage,
      },
    };

    expect(shallow(<EpisodePage {...mockProps} />).find(CustomButton)).toEqual(
      {},
    );
  });
});
