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
import { css } from 'styled-components';

/**
 * ===============
 * Styled Component {@link BaseButton}
 * ===============
 */

/**
 * @component
 *
 * @since 0.0.1
 */
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
