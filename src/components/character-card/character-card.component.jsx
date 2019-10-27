import React from 'react';
import { withRouter } from 'react-router-dom';

import { MISSING_IMG } from '../../utils/constants';

import { Card } from './character-card.styles';

const CharacterCard = ({ character, history }) => {
  const { id, name, image } = character;
  return (
    <Card onClick={() => history.push(`/characters/${id}`)}>
      {image ? (
        <img src={image} alt={name} />
      ) : (
        <img src={MISSING_IMG} alt={name} />
      )}
      <h2>{name}</h2>
    </Card>
  );
};

export default withRouter(CharacterCard);
