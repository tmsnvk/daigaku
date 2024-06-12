import styled from 'styled-components';

const SectionContainer = styled.section`
  margin: 15rem 0 auto 0;

  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    width: 75%;
    margin: 5rem auto 10rem auto;
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.small}) {
    width: 95%;
    margin: 5rem auto 10rem auto;
  }
`;

export {
  SectionContainer,
};
