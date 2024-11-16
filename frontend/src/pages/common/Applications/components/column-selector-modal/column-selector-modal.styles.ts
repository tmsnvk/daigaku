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
import styled from 'styled-components';

/* component, style imports */
import { BaseDarkBorder } from '@components/base-styles';

/**
 * ===============
 * Styled Component {@link Dialog}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const Dialog = styled.dialog`
  ${BaseDarkBorder};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5rem 7.5rem 5rem 7.5rem;
  margin: 10% auto 0 auto;

  & article {
    display: flex;
    flex-direction: row;
    margin: 1.5rem 0 0 0;

    & input {
      margin: 0 1.5rem 0 0;

      &:focus,
      &:hover {
        outline: none;
      }
    }
  }

  & button {
    margin: 5rem auto 0 auto;
    padding: 1rem 2.5rem 1rem 2.5rem;
    background-color: transparent;
    font-size: inherit;
    font-weight: 800;
    border: 0.2rem solid ${({ theme }) => theme.color.tertiaryLight};
    border-radius: ${({ theme }) => theme.options.borderRadius};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.color.tertiaryLight};
      box-shadow: 0 0.1rem 0.5rem 0 ${({ theme }) => theme.color.tertiaryLight};
    }
  }
`;
