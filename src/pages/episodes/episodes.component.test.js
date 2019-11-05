import React from 'react';
import { shallow } from 'enzyme';

import EpisodesPage from './episodes.component';

describe('EpisodesPage component', () => {

  it('should render EpisodesPage component', () => {
    const mockProps = {
      allEpisodes: {
        edges: [{
          node: {
            episodeId: 'film.2'
          }
        },
        {
          node: {
            episodeId: 'film.1'
          }
        }]
      }
    }

    expect(shallow(<EpisodesPage {...mockProps}/>)).toMatchSnapshot();
  });
});