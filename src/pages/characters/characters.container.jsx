import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import CharactersPage from './characters.component';

import { TWELVE_CHARACTERS } from '../../utils/constants';

const GET_ALL_CHARACTERS = gql`
  query AllPeople($first: Int!, $cursor: String) {
    allPeople(first: $first, after: $cursor) {
      edges {
        node {
          id
          name
          image
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const CharactersPageContainer = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_CHARACTERS, {
    variables: { first: TWELVE_CHARACTERS },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const allPeople = data.allPeople;

  return (
    <CharactersPage
      people={allPeople}
      onLoadMore={() =>
        fetchMore({
          variables: {
            cursor: allPeople.pageInfo.endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.allPeople.edges;
            const pageInfo = fetchMoreResult.allPeople.pageInfo;

            return newEdges.length
              ? {
                  allPeople: {
                    __typename: previousResult.allPeople.__typename,
                    edges: [...previousResult.allPeople.edges, ...newEdges],
                    pageInfo,
                  },
                }
              : previousResult;
          },
        })
      }
    />
  );
};

export default CharactersPageContainer;
