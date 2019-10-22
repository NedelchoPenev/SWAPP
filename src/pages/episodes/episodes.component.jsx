import React from 'react';
import EpisodeCard from '../../components/episode-card/episode-card.component';

const EpisodesPage = ({ allEpisodes }) => {
  const { edges } = allEpisodes;
  return (
    <div>
      {edges
        .sort((a, b) => a.node.episodeId - b.node.episodeId)
        .map(edge => (
          <EpisodeCard key={edge.node.episodeId} epsisode={edge.node} />
        ))}
    </div>
  );
};

export default EpisodesPage;
