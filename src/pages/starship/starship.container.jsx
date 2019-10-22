import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import StarshipPage from './starship.component';

const GET_STARSHIP = gql`
  query Starship($id: ID!) {
    starship(id: $id) {
      id
      name
      image
      model
      starshipClass
      cost
      maxAtmosphericSpeed
      maxMLPerHour
      hyperdriveRating
      crew
    }
  }
`;

const StarshipPageContainer = ({ match }) => {
  const { data, loading, error } = useQuery(GET_STARSHIP, {
    variables: { id: match.params.starshipId },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return <StarshipPage starship={data.starship} />;
};

export default StarshipPageContainer;
