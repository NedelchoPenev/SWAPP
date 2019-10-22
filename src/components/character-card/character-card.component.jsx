import React from 'react';
import { withRouter } from 'react-router-dom';

import { MISSING_IMG } from '../../utils/constants';

const CharacterCard = ({ character, history }) => {
  const { id, name, image } = character;
  return (
    <div onClick={() => history.push(`/characters/${id}`)}>
      {image ? (
        <img src={image} alt={name} />
      ) : (
        <img src={MISSING_IMG} alt={name} />
      )}
      <h1>{name}</h1>
    </div>
  );
};

export default withRouter(CharacterCard);
