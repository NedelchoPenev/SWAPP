import React from 'react';

const StarshipCard = ({ starship, onClick }) => {
  return <h4 onClick={onClick}>{starship.name}</h4>;
};

export default StarshipCard;
