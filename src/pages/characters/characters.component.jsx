import React from 'react';

import CustomButton from '../../components/custom-button/custom-button.component';
import CharacterCard from '../../components/character-card/character-card.component';

const CharactersPage = ({ people, onLoadMore }) => {
  const { edges } = people;
  return (
    <div>
      {edges.map(edge => (
        <CharacterCard key={edge.node.id} character={edge.node} />
      ))}
      <CustomButton onClick={onLoadMore}> Load More </CustomButton>
    </div>
  );
};

export default CharactersPage;
