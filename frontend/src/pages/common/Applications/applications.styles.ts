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
import styled from 'styled-components';

/* component, style imports */
import { BaseDarkBorder } from '@components/base-styles';

/**
 * ===============
 * Styled Component {@link Main}
 * ===============
 */

export const Main = styled.main`
  ${BaseDarkBorder};

  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 5% auto 5% auto;
  font-size: ${({ theme }) => theme.fontSize.medium};

  & table {
    table-layout: fixed;

    & th,
    & td {
      width: 10%;
      padding: 2.5rem 1rem 2.5rem 1rem;
      text-align: center;
    }

    & tr:first-of-type {
      & th {
        &::before,
        &::after {
          height: 1rem;
          display: table-row;
          content: '';
        }
      }

      & th:last-of-type {
        & button,
        & article {
          height: 4rem;
        }
      }
    }

    & tr:last-of-type td:first-of-type {
      border-bottom-left-radius: ${({ theme }) => theme.options.borderRadius};
    }

    & tr:last-of-type td:last-of-type {
      border-bottom-right-radius: ${({ theme }) => theme.options.borderRadius};
    }

    & svg {
      display: inline-block;
      margin: 0 0 0 1rem;
    }

    & a,
    & button {
      width: fit-content;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 auto 0 auto;
      background-color: transparent;
      color: ${({ theme }) => theme.color.primaryDark};
      font-size: ${({ theme }) => theme.fontSize.medium};
      font-weight: 800;
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.color.tertiaryLight};
      }
    }
  }
`;
