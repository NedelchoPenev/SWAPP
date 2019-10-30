import React from 'react';

import RadarChart from 'react-svg-radar-chart';

import { RadarWrapper, RadarContainer } from './radar.styles';

const captions = {
  maxAtmosphericSpeed: 'Max Atm. Speed',
  maxMLPerHour: 'Max ML/h',
  hyperdriveRating: 'HyperD Rat.',
  crew: 'Crew',
  cost: 'Cost',
};

const Radar = ({data}) => {
  return (
    <RadarContainer>
      <h2>Compared to Starship Class Max</h2>
      <RadarWrapper>
        <RadarChart
          captions={captions}
          data={[
            data
          ]}
          options={{ axes: false, scales: 5, dots: true }}
        />
      </RadarWrapper>
    </RadarContainer>
  );
};

export default Radar;
