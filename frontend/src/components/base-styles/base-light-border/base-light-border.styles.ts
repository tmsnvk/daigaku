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
 * Styled Component {@link BaseLightBorder}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const BaseLightBorder = css`
  background-color: ${({ theme }) => theme.color.primaryLight};
  border: 0.1rem solid ${({ theme }) => theme.color.secondaryLight};
  border-radius: ${({ theme }) => theme.options.borderRadius};
  box-shadow: 0.5rem 0.5rem 1rem ${({ theme }) => theme.color.primaryDark};
`;
