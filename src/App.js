import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

import SignInContainer from './components/sign-in/sign-in.container';
import Header from './components/header/header.component';
import EpisodesPageContainer from './pages/episodes/episodes.container';
import EpisodePageContainer from './pages/episode/episode.container';
import CharactersPageContainer from './pages/characters/characters.container';
import CharacterDetailsContainer from './components/character-details/character-details.container';
import StarshipPageContainer from './pages/starship/starship.container';

import { ProtectedRoute } from './utils/protected-route-hoc';

import './App.css';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const App = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path={['/', '/login']}
          render={() =>
            data.isLoggedIn ? <Redirect to="/episodes" /> : <SignInContainer />
          }
        />
        <Fragment>
          <Header />
          <ProtectedRoute
            exact
            path="/episodes"
            component={EpisodesPageContainer}
          />
          <ProtectedRoute
            path={'/episodes/:episodeId'}
            component={EpisodePageContainer}
          />
          <ProtectedRoute
            exact
            path={'/characters'}
            component={CharactersPageContainer}
          />
          <ProtectedRoute
            path={'/characters/:characterId'}
            component={CharacterDetailsContainer}
          />
          <ProtectedRoute
            path={'/starships/:starshipId'}
            component={StarshipPageContainer}
          />
        </Fragment>
      </Switch>
    </div>
  );
};

export default App;
