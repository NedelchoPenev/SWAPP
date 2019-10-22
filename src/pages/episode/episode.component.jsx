import React from 'react';

import CharacterCard from '../../components/character-card/character-card.component';
import CustomButton from '../../components/custom-button/custom-button.component';

const EpisodePage = ({ episode, onLoadMore }) => {
  const { title, openingCrawl, image, director, releaseDate, people } = episode;

  return (
    <div>
      <div>{image}</div>
      <div>{title}</div>
      <div>{openingCrawl}</div>
      <div>{director}</div>
      <div>{releaseDate}</div>
      <div>
        {people.edges.map(edge => {
          return <CharacterCard key={edge.node.id} character={edge.node} />;
        })}
      </div>
      <div>
        <CustomButton onClick={onLoadMore}> Load More </CustomButton>
      </div>
    </div>
  );
};

export default EpisodePage;
