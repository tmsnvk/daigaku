/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

/**
 * ===============
 * Styled Component {@link RouteLink}
 * ===============
 */

/**
 * @component
 *
 * @since 0.0.1
 */
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
 * ===============
 * Styled Component {@link NavbarIcon}
 * ===============
 */

/**
 * @interface
 * @description
 * The interface represents the properties of the {@link NavbarIcon} styled-component used to define styling states.
 *
 * @since 0.0.1
 */
interface NavbarIcon {
  readonly $isActive?: boolean;
}

/**
 * @component
 *
 * @since 0.0.1
 */
export const NavbarIcon = styled(FontAwesomeIcon)<NavbarIcon>`
  display: inline-block;
  color: ${({ theme, $isActive }) => ($isActive ? theme.color.tertiaryLight : theme.color.primaryDark)};
  font-size: ${({ theme }) => theme.fontSize.large};
`;
