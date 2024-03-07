import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GeneralIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 0 1rem;
  color: ${(props) => props.theme.color.primaryDark};
  font-size: ${(props) => props.theme.fontSize.xxLarge};
`;

export default GeneralIcon;
