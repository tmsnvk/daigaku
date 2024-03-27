import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ComponentPropsT = {
  $isActive: boolean;
}

const NavbarIcon = styled(FontAwesomeIcon)<ComponentPropsT>`
  display: inline-block;
  margin: 0 1.5rem 0 0;
  font-size: ${({ theme }) => theme.fontSize.large};
  color: ${({ theme, $isActive }) => $isActive ? theme.color.tertiaryLight : theme.color.primaryDark};
`;

export default NavbarIcon;
