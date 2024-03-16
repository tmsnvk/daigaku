import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primaryDark: string;
      primaryLight: string;
      secondaryDark: string;
      secondaryLight: string;
      error: string;
    },
    fontFamily: {
      primary: string;
      secondary: string;
    },
    fontSize: {
      default: string;
      small: string;
      medium: string;
      large: string;
      xLarge: string;
      xxLarge: string;
      xxxLarge: string;
    },
    mediaQuery: {
      small: string;
      medium: string;
      large: string;
      xLarge: string;
    }
  }
}
