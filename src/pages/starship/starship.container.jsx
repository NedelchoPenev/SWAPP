import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import StarshipPage from './starship.component';
import Spinner from '../../components/spinner/spinner.component';

import { ALL_STARSHIPS } from '../../utils/constants';

const calculateRadarStats = (sameClass, ship) => {
  if(sameClass.length === 0){
    const data = {
      data: {
        maxAtmosphericSpeed: 1,
        maxMLPerHour: 1,
        hyperdriveRating: 1,
        crew: 1,
        cost: 1
    }}
    return data;
  }
  const maxCrew = Math.max.apply(Math, sameClass.map(edge => edge.node.crew))
  const minCrew = Math.min.apply(Math, sameClass.map(edge => edge.node.crew))
  const maxCost = Math.max.apply(Math, sameClass.map(edge => edge.node.cost))
  const minCost = Math.min.apply(Math, sameClass.map(edge => edge.node.cost))
  const maxHyperdriveRating = Math.max.apply(Math, sameClass.map(edge => edge.node.hyperdriveRating))
  const minHyperdriveRating = Math.min.apply(Math, sameClass.map(edge => edge.node.hyperdriveRating))
  const maxMaxAtmosphericSpeed = Math.max.apply(Math, sameClass.map(edge => edge.node.maxAtmosphericSpeed))
  const minMaxAtmosphericSpeed = Math.min.apply(Math, sameClass.map(edge => edge.node.maxAtmosphericSpeed))
  const maxMaxMLPerHour = Math.max.apply(Math, sameClass.map(edge => edge.node.maxMLPerHour))
  const minMaxMLPerHour = Math.min.apply(Math, sameClass.map(edge => edge.node.maxMLPerHour))

  const crew = maxCrew === minCrew || ship.crew > maxCrew ? 1 : (ship.crew - minCrew) / (maxCrew - minCrew)
  const cost = maxCost === minCost || ship.cost > maxCost ? 1: (ship.cost - minCost) / (maxCost - minCost)
  const hyperdriveRating = maxHyperdriveRating === minHyperdriveRating || 
  ship.hyperdriveRating > maxMaxAtmosphericSpeed ? 1 :
  (ship.hyperdriveRating - minHyperdriveRating) / (maxHyperdriveRating - minHyperdriveRating)
  const maxAtmosphericSpeed = maxMaxAtmosphericSpeed === minMaxAtmosphericSpeed || 
  ship.maxAtmosphericSpeed > maxMaxAtmosphericSpeed ? 1 : 
  (ship.maxAtmosphericSpeed - minMaxAtmosphericSpeed) / (maxMaxAtmosphericSpeed - minMaxAtmosphericSpeed)
  const maxMLPerHour = maxMaxMLPerHour === minMaxMLPerHour || 
  ship.maxMLPerHour > maxMaxMLPerHour ? 1 : 
  (ship.maxMLPerHour - minMaxMLPerHour) / (maxMaxMLPerHour - minMaxMLPerHour)

  const data = {
    data: {
      maxAtmosphericSpeed: maxAtmosphericSpeed,
      maxMLPerHour: maxMLPerHour,
      hyperdriveRating: hyperdriveRating,
      crew: crew,
      cost: cost
  }}

  return data
};

const GET_STARSHIPS = gql`
  query StarshipAndAllShips($id: ID!, $first: Int!, $filter: StarshipFilter) {
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
    allStarships(first: $first, filter: $filter) {
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
  console.log(radarData)

  return <StarshipPage starship={data.starship} data={radarData}/>;
};

export default StarshipPageContainer;
