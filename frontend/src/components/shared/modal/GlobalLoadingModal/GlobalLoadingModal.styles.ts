import styled from 'styled-components';
import DefaultDialogStyles from '../DefaultDialogStyles';

const DialogContainer = styled(DefaultDialogStyles)`
  width: 45%;
  background-color: ${({ theme }) => theme.color.secondaryLight};
`;

export {
  DialogContainer,
};
