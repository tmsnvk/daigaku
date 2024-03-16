import { DefaultTheme } from 'styled-components';

const coralRed = '#F94144';
const white = '#F0F0F0';
const columbiaBlue = '#C9D7DD';
const jacarta = '#31304D';
const darkGunMetal = '#161A30';
const topaz = '#FFC374';

const theme: DefaultTheme = {
  color: {
    primaryDark: darkGunMetal,
    primaryLight: white,
    secondaryDark: jacarta,
    secondaryLight: columbiaBlue,
    tertiaryLight: topaz,
    error: coralRed,
  },
  fontFamily: {
    primary: `"Raleway", sans-serif`,
    secondary: `"Roboto", sans-serif`,
  },
  fontSize: {
    default: '1rem',
    small: '1.4rem',
    medium: '1.6rem',
    large: '2rem',
    xLarge: '2.6rem',
    xxLarge: '3rem',
    xxxLarge: '12rem',
  },
  mediaQuery: {
    small: '480px',
    medium: '768px',
    large: '992px',
    xLarge: '1200px',
  },
};

export default theme;
