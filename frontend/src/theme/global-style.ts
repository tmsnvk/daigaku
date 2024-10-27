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
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
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
    scroll-behavior: smooth;
  }

  body {
    width: 100vw;
    min-height: 100vh;
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-weight: ${({ theme }) => theme.fontWeight.normal};
    background-color: ${({ theme }) => theme.color.primaryLight};

    & > div {
      position: relative;
      min-height: 100vh;

      & > div {
        height: 7.5rem;
      }
    }
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

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font-size: inherit;
    font-family: inherit;
  }

  table {
    border-collapse: collapse;
  }
`;
