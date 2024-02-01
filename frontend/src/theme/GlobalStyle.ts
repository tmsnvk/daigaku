import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    border: 0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    line-height: 1.5;
  }

  body {
    width: 100vw;
    height: 100vh;
    font-family: ${(props) => props.theme.fontFamily.primary};
    background-color: ${(props) => props.theme.color.primaryLight};
    overflow: hidden;
  }

  a,
  a:hover,
  a:visited,
  a:active {
    text-decoration: none;
  }

  ul,
  ol,
  li {
    list-style-type: none;
  }
`;

export default GlobalStyle;
