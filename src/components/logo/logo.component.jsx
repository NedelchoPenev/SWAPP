import React from 'react';

import { LogoStyle } from './logo.styles';

const Logo = ({ asTitle, onClick }) => {
  return (
    <LogoStyle asTitle={asTitle} onClick={onClick}>
      SWAPP
    </LogoStyle>
  );
};

export default Logo;
