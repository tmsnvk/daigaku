import { DefaultTheme } from 'styled-components';

const coralRed = '#F94144';

const theme: DefaultTheme = {
  color: {
    error: coralRed,
  },
  fontFamily: {
    main: `"Roboto", sans-serif`,
  },
  fontSize: {
    default: '1rem',
    small: '1.4rem',
    medium: '1.6rem',
    large: '2rem',
    xLarge: '2.6rem',
    xxLarge: '3rem',
  },
  mediaQuery: {
    small: '480px',
    medium: '768px',
    large: '992px',
    xLarge: '1200px',
  },
};

export default theme;
