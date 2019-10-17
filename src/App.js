import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginRegisterPage from './pages/login-register/login-register.component';
import AllEpisodesContainer from './pages/episodes/episodes.container';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginRegisterPage} />
        <Route path="/episodes" component={AllEpisodesContainer} />
      </Switch>
    </div>
  );
};

export default App;
