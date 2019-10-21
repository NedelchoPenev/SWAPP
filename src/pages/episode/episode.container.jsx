import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import EpisodePage from './episode.component';

const GET_EPISODE = gql`
  query episode($id: ID!) {
    episode(id: $id) {
      id
      title
      episodeId
      openingCrawl
      image
      director
      releaseDate
    }
  }
`;

const EpisodePageContainer = ({match}) => {
  const { loading, error, data } = useQuery(GET_EPISODE, {
    variables: { id: match.params.episodeId },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return <EpisodePage episode={data.episode} />;
};

export default EpisodePageContainer;
