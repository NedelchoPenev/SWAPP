import React from 'react';
import { withRouter } from 'react-router-dom';

const EpisodeCardComponent = ({ epsisode, history, match }) => {
  const { id, title, openingCrawl, image } = epsisode;

  return (
    <div onClick={() => history.push(`${match.path}/${id}`)}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <div>{openingCrawl}</div>
    </div>
  );
};

export default withRouter(EpisodeCardComponent);
