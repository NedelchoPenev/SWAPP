import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import { ThemeProvider } from 'styled-components';

import SignInContainer from './components/sign-in/sign-in.container';
import Header from './components/header/header.component';
import EpisodesPageContainer from './pages/episodes/episodes.container';
import EpisodePageContainer from './pages/episode/episode.container';
import CharactersPageContainer from './pages/characters/characters.container';
import CharacterDetailsContainer from './components/character-details/character-details.container';
import StarshipPageContainer from './pages/starship/starship.container';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { ProtectedRoute } from './utils/protected-route-hoc';
import { lightTheme, darkTheme } from './utils/theme';

import { GlobalStyles } from './utils/global-styles';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const GET_THEME = gql`
  query GetTheme {
    theme @client
  }
`;

const App = () => {
  const {data: {theme}} = useQuery(GET_THEME);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyles />
      <Switch>
        <Route
          exact
          path={['/', '/login']}
          render={() =>
            data.isLoggedIn ? <Redirect to="/episodes" /> : <SignInContainer />
          }
        />
        <Fragment>
          <ErrorBoundary>
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
          </ErrorBoundary>
        </Fragment>
      </Switch>
      </>
    </ThemeProvider>
  );
};

export default App;
