/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const RouteLink = styled(NavLink)`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  letter-spacing: 0.2rem;

  &:hover:not(.active) {
    text-decoration: underline;
    cursor: pointer;
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;

/**
 * Defines the properties of the {@link NavbarIcon} styled-component used to define styling states.
 */
interface NavbarIcon {
  readonly $isActive?: boolean;
}

export const NavbarIcon = styled(FontAwesomeIcon)<NavbarIcon>`
  display: inline-block;
  color: ${({ theme, $isActive }) => ($isActive ? theme.color.tertiaryLight : theme.color.primaryDark)};
  font-size: ${({ theme }) => theme.fontSize.large};
`;
