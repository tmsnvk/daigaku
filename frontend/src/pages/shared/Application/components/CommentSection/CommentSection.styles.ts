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
