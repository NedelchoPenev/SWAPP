import React from 'react';

const AllEpisodes = ({ allEpisodes }) => {
  const { edges } = allEpisodes;
  return (
    <div>
      {edges.map(edge => (
        <h1>{edge.node.title}</h1>
      ))}
    </div>
  );
};

export default AllEpisodes;
