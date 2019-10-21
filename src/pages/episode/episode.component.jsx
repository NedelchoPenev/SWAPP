import React from 'react';

const EpisodePage = ({ episode }) => {
  const {
    title,
    openingCrawl,
    image,
    director,
    releaseDate,
  } = episode;

  return (
    <div>
      <div>{image}</div>
      <div>{title}</div>
      <div>{openingCrawl}</div>
      <div>{director}</div>
      <div>{releaseDate}</div>
    </div>
  );
};

export default EpisodePage;
