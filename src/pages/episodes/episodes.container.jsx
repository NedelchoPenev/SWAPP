import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import AllEpisodes from './episodes.component';

const GET_ALL_EPISODES = gql`
  query allEpisodes($first: Int!) {
    allEpisodes(first: $first) {
      edges {
        node {
          title
        }
      }
    }
  }
`;

const AllEpisodesContainer = () => {
  const { loading, error, data } = useQuery(GET_ALL_EPISODES, {
    variables: { first: 10 },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return <AllEpisodes allEpisodes={data.allEpisodes} />;
};

export default AllEpisodesContainer;
