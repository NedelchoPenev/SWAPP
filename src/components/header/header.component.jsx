import React from 'react';
import { withRouter } from 'react-router-dom';
import { useApolloClient } from 'react-apollo';

import LogoContainer from '../logo/logo.container';

import { AUTH_TOKEN } from '../../utils/constants';

import {
  HeaderContainer,
  OptionsContainer,
  LogoStyleContainer,
  OptionLink,
  LogoutStyle,
  LogoWrapper,
} from './header.styles';

const Header = ({ history }) => {
  const client = useApolloClient();
  return (
    <HeaderContainer>
      <LogoStyleContainer>
        <LogoContainer asTitle={false} />
      </LogoStyleContainer>
      <OptionsContainer>
        <OptionLink to="/episodes">Episodes</OptionLink>
        <OptionLink to="/characters">Characters</OptionLink>
        <OptionLink
          to="/login"
          onClick={() => {
            client.writeData({ data: { isLoggedIn: false } });
            localStorage.removeItem(AUTH_TOKEN);
            history.push('/login');
          }}
        >
          <LogoWrapper>
            <LogoutStyle />
          </LogoWrapper>
        </OptionLink>
      </OptionsContainer>
    </HeaderContainer>
  );
};

export default withRouter(Header);
