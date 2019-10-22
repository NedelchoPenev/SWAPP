import React from 'react';

const StarshipDetails = ({ starship }) => {
  const {
    id,
    name,
    image,
    model,
    starshipClass,
    cost,
    maxAtmosphericSpeed,
    maxMLPerHour,
    hyperdriveRating,
    crew,
  } = starship;

  return (
    <div>
      <div>{name}</div>
      <img src={image} alt={name} />
    </div>
  );
};

export default StarshipDetails;
