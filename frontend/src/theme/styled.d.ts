/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primaryDark: string;
      primaryLight: string;
      secondaryDark: string;
      secondaryLight: string;
      tertiaryLight: string;
      error: string;
    };
    fontFamily: {
      primary: string;
      secondary: string;
    };
    fontSize: {
      default: string;
      small: string;
      medium: string;
      large: string;
      xLarge: string;
      xxLarge: string;
      xxxLarge: string;
    };
    fontWeight: {
      normal: number;
      semiBold: number;
      bold: number;
    };
    options: {
      borderRadius: string;
    };
    breakpoint: {
      small: string;
      medium: string;
      large: string;
      xLarge: string;
    };
  }
}
