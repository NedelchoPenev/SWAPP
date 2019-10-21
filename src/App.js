import React, {Fragment} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AUTH_TOKEN } from "./utils/constants";

import SignInContainer from './components/sign-in/sign-in.container';
import Header from './components/header/header.component';
import EpisodesPageContainer from './pages/episodes/episodes.container';
import EpisodePageContainer from './pages/episode/episode.container';
import { ProtectedRoute } from './utils/protected-route-hoc';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path={["/", "/login"]} render={() =>
          localStorage.getItem(AUTH_TOKEN) ?
            (<Redirect to="/episodes" />) :
            (<SignInContainer />)} />
        <Fragment>
          <Header />
          <ProtectedRoute exact path="/episodes" component={EpisodesPageContainer} />
          <ProtectedRoute path={"/episodes/:episodeId"} component={EpisodePageContainer} />
        </Fragment>
      </Switch>
    </div>
  );
};

export default App;
