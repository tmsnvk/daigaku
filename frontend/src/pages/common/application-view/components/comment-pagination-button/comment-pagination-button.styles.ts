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
import { BaseButton } from '@components/base-styles/base-button';

/**
 * ===============
 * Styled Component {@link PaginationButton}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const PaginationButton = styled.button`
  ${BaseButton}

  color: ${({ theme }) => theme.color.primaryLight};
  background-color: ${({ theme }) => theme.color.primaryDark};

  &:hover:not([disabled]) {
    background-color: ${({ theme }) => theme.color.secondaryDark};
    color: ${({ theme }) => theme.color.primaryLight};
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.color.secondaryDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.tertiaryLight};
    color: ${({ theme }) => theme.color.primaryDark};
  }

  &:focus {
    outline: 0.15rem solid ${({ theme }) => theme.color.secondaryDark};
  }
`;
