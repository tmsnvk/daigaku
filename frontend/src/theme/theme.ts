import { DefaultTheme } from 'styled-components';

const coralRed = '#F94144';
const white = '#F0F0F0';
const columbiaBlue = '#C9D7DD';
const jacarta = '#31304D';
const darkGunMetal = '#161A30';
const indianYellow = '#eaa14f';

const theme: DefaultTheme = {
  color: {
    primaryDark: darkGunMetal,
    primaryLight: white,
    secondaryDark: jacarta,
    secondaryLight: columbiaBlue,
    tertiaryLight: indianYellow,
    error: coralRed,
  },
  fontFamily: {
    primary: `"Raleway", sans-serif`,
    secondary: `"Roboto", sans-serif`,
  },
  fontSize: {
    default: '1rem',
    small: '1.2rem',
    medium: '1.4rem',
    large: '1.8rem',
    xLarge: '2.6rem',
    xxLarge: '3rem',
    xxxLarge: '12rem',
  },
  breakpoint: {
    small: '640px',
    medium: '768px',
    large: '1024px',
    xLarge: '1280px',
  },
};

export default theme;
