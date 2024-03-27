import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GeneralIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  margin: 0 1.5rem 0 0;
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export default GeneralIcon;
