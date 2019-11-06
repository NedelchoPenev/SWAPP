import React from 'react';

import CustomButton from '../../components/custom-button/custom-button.component';
import CharacterCard from '../../components/character-card/character-card.component';

import { CharWrapper, CharContainer } from './characters.styles';

const CharactersPage = ({ people, onLoadMore }) => {
  const { edges } = people;
  return (
    <CharWrapper>
      <CharContainer>
        {edges.map(edge => (
          <CharacterCard key={edge.node.id} character={edge.node} />
        ))}
      </CharContainer>
      {people.pageInfo.hasNextPage ? (
        <CustomButton onClick={onLoadMore}> Load More </CustomButton>
      ) : null}
    </CharWrapper>
  );
};

export default CharactersPage;
