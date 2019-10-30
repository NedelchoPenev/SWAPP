import React from 'react';

import StarshipDetails from '../../components/starship-details/starship-details.component';
import Radar from '../../components/radar/radar.component';

import { ShipDetailsWrapper, ShipDetailsContainer } from './starship.styles';

const StarshipPage = ({ starship, data }) => {
  return (
    <ShipDetailsWrapper>
      <h1>{starship.name}</h1>
      <h2>({starship.model})</h2>
      <ShipDetailsContainer>
        <StarshipDetails starship={starship} />
        <Radar data={data} />
      </ShipDetailsContainer>
    </ShipDetailsWrapper>
  );
};

export default StarshipPage;
