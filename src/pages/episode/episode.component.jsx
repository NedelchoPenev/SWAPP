import React from 'react';

import CharacterCard from '../../components/character-card/character-card.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { CharWrapper, CharContainer } from '../characters/characters.styles';
import { EpisodeContainer, ImgCard, Info, TitleContainer } from './episode.style';

const numToRomanNum = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
};

const EpisodePage = ({ episode, onLoadMore }) => {
  const {
    episodeId,
    title,
    openingCrawl,
    image,
    director,
    releaseDate,
    people,
  } = episode;

  return (
    <EpisodeContainer>
      <ImgCard>
        <img src={image} alt={title} />
        <TitleContainer>
          <h1>Star Wars: Episode {numToRomanNum[episodeId]}</h1>
          <h2>{title}</h2>
        </TitleContainer>
      </ImgCard>
      <Info>
        <p>{openingCrawl}</p>
        <p><span id="pointer">Director:</span> <span id="content">{director}</span></p>
        <p><span id="pointer">Release Date: </span><span id="content">{releaseDate}</span></p>
      </Info>
      <CharWrapper>
        <CharContainer>
          {people.edges.map(edge => {
            return <CharacterCard key={edge.node.id} character={edge.node} />;
          })}
        </CharContainer>
        {people.pageInfo.hasNextPage ? (
          <CustomButton onClick={onLoadMore}> Load More </CustomButton>
        ) : null}
      </CharWrapper>
    </EpisodeContainer>
  );
};

export default EpisodePage;
