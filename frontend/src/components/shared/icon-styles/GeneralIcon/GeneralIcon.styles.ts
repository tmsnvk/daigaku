import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ComponentPropT = {
  $isActive?: boolean;
}

const GeneralIcon = styled(FontAwesomeIcon)<ComponentPropT>`
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 0 0.5rem;
  color: ${({ theme, $isActive }) => $isActive ? theme.color.tertiaryLight : theme.color.primaryDark};
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export default GeneralIcon;
