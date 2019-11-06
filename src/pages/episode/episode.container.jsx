import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

import EpisodePage from './episode.component';
import Spinner from '../../components/spinner/spinner.component';

import { FIVE_CHARACTERS } from '../../utils/constants';

export const GET_EPISODE = gql`
  query Episode($id: ID!, $first: Int!, $after: String) {
    episode(id: $id) {
      id
      title
      episodeId
      openingCrawl
      image
      director
      releaseDate
      people(first: $first, after: $after) {
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
  }
`;

const EpisodePageContainer = ({ match }) => {
  const { loading, error, data, fetchMore } = useQuery(GET_EPISODE, {
    variables: { id: match.params.episodeId, first: FIVE_CHARACTERS },
  });

  if (loading) return <Spinner />;
  if (error) return `Error! ${error}`;

  const people = data.episode.people;

  const loadMore = () => {
    fetchMore({
      variables: {
        after: people.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.episode.people.edges;
        const pageInfo = fetchMoreResult.episode.people.pageInfo;

        return newEdges.length
          ? {
              episode: {
                ...previousResult.episode,
                people: {
                  __typename: previousResult.episode.people.__typename,
                  edges: [...previousResult.episode.people.edges, ...newEdges],
                  pageInfo,
                },
              },
            }
          : previousResult;
      },
    });
  };

  return <EpisodePage episode={data.episode} onLoadMore={() => loadMore()} />;
};

export default EpisodePageContainer;
