/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { css } from 'styled-components';

/**
 * ===============
 * Styled Component {@link BaseDarkBorder}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const BaseDarkBorder = css`
  background-color: ${({ theme }) => theme.color.secondaryLight};
  border: 0.1rem solid ${({ theme }) => theme.color.secondaryLight};
  border-radius: ${({ theme }) => theme.options.borderRadius};
  box-shadow: 0 0.1rem 1.5rem 0 ${({ theme }) => theme.color.primaryDark};
`;
