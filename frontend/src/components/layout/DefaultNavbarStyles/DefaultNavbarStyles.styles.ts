import styled from 'styled-components';

const DefaultNavbarStyles = styled.header`
  background-color: ${(props) => props.theme.color.secondaryLight};
  box-shadow: 0 0.1rem 1.5rem 0 ${(props) => props.theme.color.primaryDark};
  
  & nav {
    width: 85%;
    height: 7.5rem;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > a {
      font-size: ${(props) => props.theme.fontSize.xLarge};
      color: inherit;
      
      & svg {
        margin: 0 1.5rem 0 0;
      }
    }
    
    & ul {
      display: flex;
      flex-direction: row;

      & li {
        margin: 0 3.5rem 0 3.5rem;
        font-size: 2rem;
        font-weight: 600;
        letter-spacing: 0.2rem;

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }

        & a {
          color: inherit;
        }
        
        & svg {
          margin: 0 1.5rem 0 0;
        }
      }
    }
  }
`;

export default DefaultNavbarStyles;
