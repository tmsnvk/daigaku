/**
 * @prettier
 */

import { css } from 'styled-components';

export const BaseLightBorder = css`
  background-color: ${({ theme }) => theme.color.primaryLight};
  border: 0.1rem solid ${({ theme }) => theme.color.secondaryLight};
  border-radius: ${({ theme }) => theme.options.borderRadius};
  box-shadow: 0.5rem 0.5rem 1rem ${({ theme }) => theme.color.primaryDark};
`;
