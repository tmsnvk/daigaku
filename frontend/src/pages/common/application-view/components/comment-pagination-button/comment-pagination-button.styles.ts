/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import styled from 'styled-components';

/* component, style imports */
import { BaseButton } from '@components/base-styles/base-button';

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
