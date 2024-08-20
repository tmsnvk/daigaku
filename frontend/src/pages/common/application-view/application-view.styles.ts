import styled from 'styled-components';

const MainGrid = styled.main`
  display: grid;
  grid-template-columns: 1fr 0.75fr;
  grid-template-rows: auto;
  column-gap: 2.5rem;

  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    grid-template-columns: 1fr;
  }
`;

export {
  MainGrid,
};
