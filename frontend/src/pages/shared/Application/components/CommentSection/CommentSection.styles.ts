import styled from 'styled-components';

const Section = styled.section`
  margin: 5rem 5rem 0 0;
  
  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 0 0 5rem 0;
    
    & span {
      font-size: ${({ theme }) => theme.fontSize.large};
    }

    & button {
      height: 5rem;
      padding: 0 2.5rem 0 2.5rem;
      text-align: center;
      color: ${({ theme }) => theme.color.primaryLight};
      font-size: ${({ theme }) => theme.fontSize.large};
      letter-spacing: 0.3rem;
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.color.primaryDark};
      border: 0.3rem solid ${({ theme }) => theme.color.primaryDark};
      border-radius: 1rem;
      cursor: pointer;
    
      &:hover:not([disabled]) {
        background-color: ${({ theme }) => theme.color.secondaryDark};
        color: ${({ theme }) => theme.color.primaryLight};
        box-shadow: 0 0 0.5rem ${({ theme }) => theme.color.secondaryDark};
      }
    
      &:disabled {
        cursor: not-allowed;
      }
    
      &:focus {
        outline: 0.15rem solid ${({ theme }) => theme.color.secondaryDark};
      }
    }
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    width: 75%;
    margin: 5rem auto 5rem auto;
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.small}) {
    width: 95%;
    margin: 5rem auto 5rem auto;
  }
`;

export {
  Section,
};
