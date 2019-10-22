import React from 'react';

import StarshipDetails from '../../components/starship-details/startship-details.component';

const StarshipPage = ({ starship }) => {
  return (
    <div>
      <StarshipDetails starship={starship} />
    </div>
  );
};

export default StarshipPage;
