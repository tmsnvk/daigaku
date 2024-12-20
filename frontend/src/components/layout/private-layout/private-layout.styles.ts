/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import styled from 'styled-components';

/* component, style imports */
import { BaseNavbar } from '@components/base-styles';

/**
 * ===============
 * Styled Component {@link Header}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const Header = styled(BaseNavbar)`
  & nav {
    height: 15rem;

    & > div:nth-of-type(1) {
      flex: 0 0 auto;
      width: 33%;
    }

    & > div:nth-of-type(2) {
      flex: 1 0 auto;
    }

    & ul:first-of-type {
      margin: 0 0 4rem 0;
    }

    & ul:last-of-type {
      justify-content: flex-end;
    }
  }
`;

/**
 * ===============
 * Styled Component {@link SmallScreenMenuWrapper}
 * ===============
 */

/**
 * Defines the properties of the {@link SmallScreenMenuWrapper} styled-component used to define styling states.
 *
 * @since 0.0.1
 */
interface SmallScreenMenuWrapper {
  /**
   * A boolean indicating whether the navbar is currently open.
   */
  readonly $isNavbarOpen: boolean;
}

/**
 * @since 0.0.1
 */
export const SmallScreenMenuWrapper = styled.div<SmallScreenMenuWrapper>`
  right: ${({ $isNavbarOpen }) => ($isNavbarOpen ? '0' : '-100%')};

  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    z-index: 100;
    position: fixed;
    top: 0;
    width: 45%;
    height: 100%;
    padding: 10rem 0 0 5rem;
    transition: right 0.4s;
    background-color: ${({ theme }) => theme.color.secondaryLight};
    box-shadow: 0 0.1rem 1.5rem 0 ${({ theme }) => theme.color.primaryDark};
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.medium}) {
    width: 65%;
  }
`;

/**
 * ===============
 * Styled Component {@link SmallScreenMenuToggle}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const SmallScreenMenuToggle = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  width: 5%;

  @media screen and (width >= ${({ theme }) => theme.breakpoint.large}) {
    display: none;
  }
`;
