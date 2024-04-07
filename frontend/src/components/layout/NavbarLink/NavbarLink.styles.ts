import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const LinkContainer = styled(NavLink)`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: 600;
  letter-spacing: 0.2rem;

  &:hover:not(.active) {
    text-decoration: underline;
    cursor: pointer;
  }
  
  & svg {
    
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;

type ComponentPropsT = {
  $isActive: boolean;
}

const NavbarIcon = styled(FontAwesomeIcon)<ComponentPropsT>`
  display: inline-block;
  margin: 0 1.5rem 0 0;
  color: ${({ theme, $isActive }) => $isActive ? theme.color.tertiaryLight : theme.color.primaryDark};
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export {
  LinkContainer,
  NavbarIcon,
};
