import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LinkContainer = styled(NavLink)`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: 600;
  letter-spacing: 0.2rem;

  &:hover:not(.active) {
    text-decoration: underline;
    cursor: pointer;
  }
  
  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;

type ComponentPropsT = {
  $isActive?: boolean;
}

const NavbarIcon = styled(FontAwesomeIcon)<ComponentPropsT>`
  display: inline-block;
  color: ${({ theme, $isActive }) => $isActive ? theme.color.tertiaryLight : theme.color.primaryDark};
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export {
  LinkContainer,
  NavbarIcon,
};
