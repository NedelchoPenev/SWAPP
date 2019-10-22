import React from 'react';
import { withRouter } from 'react-router-dom';

import StarshipCard from '../starship-card/starship-card.component';

import { MISSING_IMG } from '../../utils/constants';

const CharacterDetails = ({ person, history }) => {
  const { name, image, height, mass, species, homeworld, starships } = person;

  return (
    <div>
      <h1>{name}</h1>
      {image ? (
        <img src={image} alt={name} />
      ) : (
        <img src={MISSING_IMG} alt={name} />
      )}

      <div>{height}</div>
      <div>{mass}</div>
      <div>{species.name}</div>
      <div>{homeworld.name}</div>
      <div>
        {starships.edges.map(edge => (
          <StarshipCard
            key={edge.node.id}
            starship={edge.node}
            onClick={() => history.push(`/starships/${edge.node.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default withRouter(CharacterDetails);
