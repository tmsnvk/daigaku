/**
 * @prettier
 */

/* external imports */
import styled from 'styled-components';

/* component, style imports */
import { BaseDialog } from '@components/base-styles';

export const Dialog = styled(BaseDialog)`
  display: flex;
  flex-direction: column;
  width: 45%;
  background-color: ${({ theme }) => theme.color.secondaryLight};

  & p {
    margin: 1.5rem 2.5rem 1.5rem 2.5rem;
  }

  & input {
    margin: 2.5rem auto 0 auto;
  }
`;
