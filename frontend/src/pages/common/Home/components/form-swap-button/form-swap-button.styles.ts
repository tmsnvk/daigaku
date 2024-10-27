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

/**
 * ===============
 * Styled Component {@link Button}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const Button = styled.button`
  height: 5rem;
  padding: 0 1.5rem 0 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: 800;
  color: ${({ theme }) => theme.color.secondaryDark};
  background-color: ${({ theme }) => theme.color.secondaryLight};
  border-radius: 0.75rem;
  cursor: pointer;

  &:focus,
  &:hover {
    outline: 0.25rem solid ${({ theme }) => theme.color.secondaryDark};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
