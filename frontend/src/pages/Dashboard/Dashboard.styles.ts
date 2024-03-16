import styled from 'styled-components';

const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 7.5rem;
  padding: 5% 0 0 5%;
  
  & section {
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
