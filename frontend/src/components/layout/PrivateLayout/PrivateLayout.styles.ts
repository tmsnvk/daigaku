import styled from 'styled-components';

type NavbarComponentPropsT = {
  $isNavbarOpen: boolean;
}

const SmallScreenMenuWrapper = styled.div<NavbarComponentPropsT>`
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

const SmallScreenMenuToggler = styled.div`
  position: absolute;
  top: 2.5rem;
  right: 2.5rem;

  @media screen and (width >= ${({ theme }) => theme.breakpoint.large}) {
    display: none;
  }
`;

export {
  SmallScreenMenuWrapper,
  SmallScreenMenuToggler,
};
