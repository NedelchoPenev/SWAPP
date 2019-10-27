import React from 'react';
import { withRouter } from 'react-router-dom';

import StarshipCard from '../starship-card/starship-card.component';

import { MISSING_IMG } from '../../utils/constants';

import {
  CharDetailsWrapper,
  CharDetailsCard,
  CharShips,
  CharDetailsContainer,
} from './character-details.styles';

const CharacterDetails = ({ person, history }) => {
  const { name, image, height, mass, species, homeworld, starships } = person;

  return (
    <CharDetailsWrapper>
      <h1>{name}</h1>
      <CharDetailsContainer>
        <CharDetailsCard>
          <h2>{name}</h2>
          {image ? (
            <img src={image} alt={name} />
          ) : (
            <img src={MISSING_IMG} alt={name} />
          )}

          <p><span id="pointer">Height: </span><span id="content">{height}</span></p>
          <p><span id="pointer">Weight: </span><span id="content">{mass}</span></p>
          <p><span id="pointer">Species: </span><span id="content">{species.name}</span></p>
          <p><span id="pointer">Home World: </span><span id="content">{homeworld.name}</span></p>
        </CharDetailsCard>
        <CharShips>
          <h2>Piloted Starships</h2>
          {starships.edges.map(edge => (
            <StarshipCard
              key={edge.node.id}
              starship={edge.node}
              onClick={() => history.push(`/starships/${edge.node.id}`)}
            />
          ))}
        </CharShips>
      </CharDetailsContainer>
    </CharDetailsWrapper>
  );
};

export default withRouter(CharacterDetails);
