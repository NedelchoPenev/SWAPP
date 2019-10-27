import { createGlobalStyle } from 'styled-components';

import DeadStar from '../fonts/DeathStar-VmWB.ttf';
import SFDistantGalaxy from '../fonts/SfDistantGalaxyOutline-xoeO.ttf';

export const GlobalStyles = createGlobalStyle`
  @font-face {
  font-family: 'Death Star';
  src: url(${DeadStar}) format('truetype');
  }

  @font-face {
  font-family: 'SF Distant Galaxy Outline';
  src: url(${SFDistantGalaxy}) format('truetype');
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  button {
    cursor: pointer;
  }

	a {
		text-decoration: none;
	}
`;
