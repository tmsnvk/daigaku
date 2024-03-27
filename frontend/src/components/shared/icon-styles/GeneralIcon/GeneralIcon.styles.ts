import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GeneralIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 0 0.5rem;
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export default GeneralIcon;
