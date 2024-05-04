import styled from 'styled-components';
import DefaultDialogStyles from '../DefaultDialogStyles';

const Dialog = styled(DefaultDialogStyles)`
  width: 45%;
  padding: 0;
  background-color: ${({ theme }) => theme.color.secondaryLight};
  
  & p {
    margin: 2.5rem 0 2.5rem 0;
  }
`;

export {
  Dialog,
};
