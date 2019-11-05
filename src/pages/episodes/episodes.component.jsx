import React from 'react';

import EpisodeCard from '../../components/episode-card/episode-card.component';

import { EpisodesContainer } from './episodes.styles';

const EpisodesPage = ({ allEpisodes: { edges } }) => {
  return (
    <EpisodesContainer>
      {edges
        .sort((a, b) => a.node.episodeId - b.node.episodeId)
        .map(edge => (
          <EpisodeCard key={edge.node.episodeId} epsisode={edge.node} />
        ))}
    </EpisodesContainer>
  );
};

export default EpisodesPage;
