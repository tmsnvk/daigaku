import styled from 'styled-components';

import { BaseNavbar } from '@components/base-styles';

const Header = styled(BaseNavbar)`
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

interface SmallScreenMenuWrapper {
  readonly $isNavbarOpen: boolean;
}

const SmallScreenMenuWrapper = styled.div<SmallScreenMenuWrapper>`
  right: ${({ $isNavbarOpen }) => $isNavbarOpen ? '0' : '-100%'};

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

const SmallScreenMenuToggle = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;
  width: 5%;

  @media screen and (width >= ${({ theme }) => theme.breakpoint.large}) {
    display: none;
  }
`;

export {
  Header,
  SmallScreenMenuWrapper,
  SmallScreenMenuToggle,
};
