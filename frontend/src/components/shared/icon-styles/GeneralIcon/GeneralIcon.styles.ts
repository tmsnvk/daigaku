import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GeneralIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  vertical-align: middle;
  color: ${(props) => props.theme.color.primaryDark};
  font-size: ${(props) => props.theme.fontSize.xxLarge};
`;

export default GeneralIcon;
