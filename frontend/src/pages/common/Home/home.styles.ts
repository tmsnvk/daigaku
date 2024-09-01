/**
 * @prettier
 */

/**
 * @fileoverview
 * @author Tamas N. <dev@tamasnovak.net>
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import styled, { keyframes } from 'styled-components';

/* component, style imports */
import { BaseLightBorder } from '@components/base-styles';

const fadeInFromBottom = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`;

export const MainContainer = styled.main`
  container-type: inline-size;
  container-name: main;
  display: flex;
  flex-direction: column;
  align-items: center;

  & section {
    ${BaseLightBorder};

    margin: 5% 0 5% 0;
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5rem 2.5rem 5rem 2.5rem;
    text-align: center;
    animation: ${fadeInFromBottom} ease 1s;

    & > article {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10rem 0 0 0;
    }

    & form {
      display: flex;
      flex-direction: column;
      align-items: center;

      & article {
        text-align: center;
      }

      & article:last-of-type {
        height: 5rem;
        margin: 2.5rem 0 0 0;
      }
    }
  }

  @container main (width > ${({ theme }) => theme.breakpoint.small}) {
    & section {
      width: 50rem;
    }
  }
`;
