import styled from 'styled-components';
import DefaultDialogStyles from '../DefaultDialogStyles';

const Dialog = styled(DefaultDialogStyles)`
  width: 45%;
  background-color: ${({ theme }) => theme.color.secondaryLight};
`;

export {
  Dialog,
};
