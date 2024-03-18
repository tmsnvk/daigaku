import styled from 'styled-components';

const DefaultNavbarStyles = styled.header`
  background-color: ${(props) => props.theme.color.secondaryLight};
  box-shadow: 0 0.1rem 1.5rem 0 ${(props) => props.theme.color.primaryDark};

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
      font-size: ${(props) => props.theme.fontSize.large};
      font-weight: 600;
      letter-spacing: 0.2rem;
    }

    & svg {
      margin: 0 1.5rem 0 0;
    }

    & ul {
      display: flex;
      flex-direction: row;

      & li {
        margin: 0 2.5rem 0 2.5rem;
      }
    }
  }
`;

export default DefaultNavbarStyles;
