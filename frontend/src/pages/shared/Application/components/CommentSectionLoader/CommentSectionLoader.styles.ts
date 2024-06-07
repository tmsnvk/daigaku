import styled from 'styled-components';

const SectionContainer = styled.section`
  margin: 5rem 5rem 0 0;

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
  SectionContainer,
};
