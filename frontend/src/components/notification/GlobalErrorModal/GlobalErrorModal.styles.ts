import styled from 'styled-components';
import { BaseDialog } from '@components/base-styles';

const Dialog = styled(BaseDialog)`
  width: 45%;
  padding: 0;
  background-color: ${({ theme }) => theme.color.secondaryLight};
  
  & p {
    margin: 1.5rem 0 1.5rem 0;
  }
`;

export {
  Dialog,
};
