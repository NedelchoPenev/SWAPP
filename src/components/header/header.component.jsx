import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useApolloClient } from 'react-apollo';

const fontFamily = {
  fontFamily: 'Death Star',
  fontSize: '46px',
};

const Header = ({ history }) => {
  const client = useApolloClient();
  return (
    <div className="header">
      <div className="logo-container">
        <div className="logo" style={fontFamily}>
          SWAPP
        </div>
      </div>
      <div className="options">
        <Link className="option" to="/episodes">
          Episodes
        </Link>
        <Link className="option" to="/characters">
          Characters
        </Link>
        <Link
          className="option"
          to="/login"
          onClick={() => {
            client.writeData({ data: { isLoggedIn: false } });
            localStorage.clear();
            history.push('/login');
          }}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Header);
