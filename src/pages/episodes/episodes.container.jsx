import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import EpisodesPage from './episodes.component';
import Spinner from '../../components/spinner/spinner.component';

import { ALL_EPISODES } from '../../utils/constants';

export const GET_ALL_EPISODES = gql`
  query allEpisodes($first: Int!) {
    allEpisodes(first: $first) {
      edges {
        node {
          id
          title
          episodeId
          openingCrawl
          image
        }
      }
    }
  }
`;

const EpisodesPageContainer = () => {
  const { loading, error, data } = useQuery(GET_ALL_EPISODES, {
    variables: { first: ALL_EPISODES },
  });

  if (loading) return <Spinner />;
  if (error) return `Error! ${error}`;

  return <EpisodesPage allEpisodes={data.allEpisodes} />;
};

export default EpisodesPageContainer;
