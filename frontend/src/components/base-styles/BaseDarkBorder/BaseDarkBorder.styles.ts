import { css } from 'styled-components';

const BaseDarkBorder = css`
  background-color: ${({ theme }) => theme.color.secondaryLight};
  border: 0.25rem solid ${({ theme }) => theme.color.secondaryLight};
  border-radius: 0.75rem;
  box-shadow: 0 0.1rem 1.5rem 0 ${({ theme }) => theme.color.primaryDark};
`;

export default BaseDarkBorder;
