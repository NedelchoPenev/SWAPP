import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import StarshipPage from './starship.component';
import Spinner from '../../components/spinner/spinner.component';

import { ALL_STARSHIPS } from '../../utils/constants';

import { calculateRadarStats } from '../../utils/calculate-radar-stats';

export const GET_STARSHIPS = gql`
  query StarshipAndAllShips($id: ID!, $first: Int!) {
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
    allStarships(first: $first) {
      edges {
        node {
          id
          cost
          maxAtmosphericSpeed
          maxMLPerHour
          hyperdriveRating
          crew
          starshipClass
        }
      }
    }
  }
`;

const StarshipPageContainer = ({ match }) => {
  const { data, loading, error } = useQuery(GET_STARSHIPS, {
    variables: { id: match.params.starshipId, first: ALL_STARSHIPS },
  });

  if (loading) return <Spinner />;
  if (error) return `Error! ${error}`;

  const sameClassStarships = data.allStarships.edges.filter(
    edge =>
      edge.node.starshipClass === data.starship.starshipClass &&
      edge.node.id !== data.starship.id,
  );

  const radarData = calculateRadarStats(sameClassStarships, data.starship);

  return <StarshipPage starship={data.starship} data={radarData} />;
};

export default StarshipPageContainer;
