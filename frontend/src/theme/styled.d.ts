import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      error: string;
    },
    fontFamily: {
      main: string;
    },
    fontSize: {
      default: string;
      small: string;
      medium: string;
      large: string;
      xLarge: string;
      xxLarge: string;
    },
    mediaQuery: {
      small: string;
      medium: string;
      large: string;
      xLarge: string;
    }
  }
}
