import styled from 'styled-components';

const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 7.5rem;
  margin: 5% 5% 0 5%;

  & > section:not(:first-of-type) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1 100vw;
    column-gap: 7.5rem;
  }
`;

export {
  MainContainer,
};
