import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { AUTH_TOKEN } from '../../utils/constants';

const Header = ({ history }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <div className="logo">SWAPP</div>
      </div>
      <div className="options">
        <Link className="option" to="/episodes">
          Episodes
        </Link>
        <Link className="option" to="/characters">
          Characters
        </Link>
        <Link className="option" to="/login" onClick={() => localStorage.removeItem(AUTH_TOKEN)}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Header);
