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
    breakpoint: {
      small: string;
      medium: string;
      large: string;
      xLarge: string;
    }
  }
}
