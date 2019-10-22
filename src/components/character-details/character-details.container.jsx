import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import CharacterDetails from './character-details.component';

const GET_PERSON = gql`
  query Person($id: ID!) {
    person(id: $id) {
      name
      image
      height
      mass
      species {
        name
      }
      homeworld {
        name
      }
      starships {
        edges {
          node {
            id
            name
            image
          }
        }
      }
    }
  }
`;

const CharacterDetailsContainer = ({ match }) => {
  const { data, loading, error } = useQuery(GET_PERSON, {
    variables: { id: match.params.characterId },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return <CharacterDetails person={data.person} />;
};

export default CharacterDetailsContainer;
