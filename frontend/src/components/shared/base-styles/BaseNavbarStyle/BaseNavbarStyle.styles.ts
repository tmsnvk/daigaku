import styled from 'styled-components';

const BaseNavbarStyle = styled.header`
  background-color: ${({ theme }) => theme.color.secondaryLight};
  box-shadow: 0 0.1rem 1.5rem 0 ${({ theme }) => theme.color.primaryDark};

  & nav {
    width: 90%;
    height: 7.5rem;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & div {
      color: inherit;
      font-size: ${({ theme }) => theme.fontSize.large};
      font-weight: 600;
      letter-spacing: 0.2rem;
    }

    & ul {
      display: flex;
      flex-direction: row;

      & li {
        margin: 0 2.5rem 0 2.5rem;
      }
    }
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    & nav {
      & ul {
        display: flex;
        flex-direction: column;

        & li {
          margin: 2.5rem 0 2.5rem 0;
          font-size: ${({ theme }) => theme.fontSize.xLarge};
        }
      }
    }
  }
`;

export default BaseNavbarStyle;
