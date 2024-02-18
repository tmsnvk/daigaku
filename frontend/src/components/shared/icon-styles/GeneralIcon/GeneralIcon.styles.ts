import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GeneralIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  color: ${(props) => props.theme.color.primaryDark};
  font-size: ${(props) => props.theme.fontSize.xxLarge};
  margin: 0 0 0 1.5rem;
`;

export default GeneralIcon;
