import React from 'react';
import { withRouter } from 'react-router-dom';

import { Card, CardInner, CardMedia, CardMeta, Title, Description } from './episode-card.styles';

const EpisodeCard = ({ epsisode: { id, title, openingCrawl, image }, history, match }) => {
  return (
    <Card onClick={() => history.push(`${match.path}/${id}`)}>
      <CardInner>
        <CardMedia>
          <img src={image} alt={title} />
        </CardMedia>
        <CardMeta>
          <Title>{title}</Title>
          <Description>{openingCrawl}</Description>
        </CardMeta>
      </CardInner>
    </Card>
  );
};

export default withRouter(EpisodeCard);
