import React from 'react';

import { Card } from './starship.card.styles';

const StarshipCard = ({ starship, onClick }) => {
  return (
    <Card onClick={onClick}>
      <img src={starship.image} alt={starship.name} />
      <h2>{starship.name}</h2>
    </Card>
  );
};

export default StarshipCard;
