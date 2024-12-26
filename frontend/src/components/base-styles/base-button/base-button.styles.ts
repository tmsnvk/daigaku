/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { css } from 'styled-components';

export const BaseButton = css`
  height: 5rem;
  padding: 0 2.5rem 0 2.5rem;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.large};
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  border: 0.3rem solid ${({ theme }) => theme.color.primaryDark};
  border-radius: ${({ theme }) => theme.options.borderRadius};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;
