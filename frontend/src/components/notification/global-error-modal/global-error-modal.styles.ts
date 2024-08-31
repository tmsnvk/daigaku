/**
 * @prettier
 */

/* external imports */
import styled from 'styled-components';

/* component, style imports */
import { BaseDialog } from '@components/base-styles';

export const Dialog = styled(BaseDialog)`
  width: 45%;
  padding: 0;
  background-color: ${({ theme }) => theme.color.secondaryLight};

  & p {
    margin: 1.5rem 2.5rem 1.5rem 2.5rem;
  }
`;
