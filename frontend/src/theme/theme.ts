/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { DefaultTheme } from 'styled-components';

const coralRed = '#F94144';
const white = '#F0F0F0';
const columbiaBlue = '#C9D7DD';
const jacarta = '#31304D';
const darkGunMetal = '#161A30';
const indianYellow = '#eaa14f';

export const theme: DefaultTheme = {
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
    xxLarge: '5rem',
    xxxLarge: '12rem',
  },
  fontWeight: {
    normal: 400,
    semiBold: 600,
    bold: 800,
  },
  options: {
    borderRadius: '1.5rem',
  },
  breakpoint: {
    small: '640px',
    medium: '768px',
    large: '1024px',
    xLarge: '1280px',
  },
};
