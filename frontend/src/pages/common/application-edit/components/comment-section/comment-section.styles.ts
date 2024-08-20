import styled from 'styled-components';

const Section = styled.section`
  margin: 10rem 5rem 0 0;
  
  & > div {
    width: 75%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto 5rem auto;
    
    & span {
      font-size: ${({ theme }) => theme.fontSize.large};
    }
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    width: 65%;
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
