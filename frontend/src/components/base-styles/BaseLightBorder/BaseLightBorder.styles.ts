import { css } from 'styled-components';

const BaseLightBorder = css`
  border: 0.1rem solid ${({ theme }) => theme.color.secondaryLight};
  border-radius: 1.25rem;
  box-shadow: 0.25rem 0.25rem 1rem ${({ theme }) => theme.color.primaryDark};
`;

export default BaseLightBorder;
