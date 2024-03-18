import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ComponentPropT = {
  $isActive?: boolean;
}

const GeneralIcon = styled(FontAwesomeIcon)<ComponentPropT>`
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 0 1rem;
  color: ${(props) => props.$isActive ? props.theme.color.tertiaryLight : props.theme.color.primaryDark};
  font-size: ${(props) => props.theme.fontSize.xxLarge};
`;

export default GeneralIcon;
