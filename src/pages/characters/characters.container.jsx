import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import CharactersPage from './characters.component';
import Spinner from '../../components/spinner/spinner.component';

import { TWELVE_CHARACTERS } from '../../utils/constants';

export const GET_ALL_CHARACTERS = gql`
  query AllPeople($first: Int!, $after: String) {
    allPeople(first: $first, after: $after) {
      edges {
        node {
          id
          name
          image
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

const CharactersPageContainer = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_ALL_CHARACTERS, {
    variables: { first: TWELVE_CHARACTERS },
  });

  if (loading) return <Spinner />;
  if (error) return `Error! ${error}`;

  const allPeople = data.allPeople;

  const loadMore = () => {
    fetchMore({
      variables: {
        after: allPeople.pageInfo.endCursor,
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
    });
  };

  return <CharactersPage people={allPeople} onLoadMore={() => loadMore()} />;
};

export default CharactersPageContainer;
