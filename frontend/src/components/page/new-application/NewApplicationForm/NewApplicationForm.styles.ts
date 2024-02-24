import styled from 'styled-components';

const FormGridContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 5rem;
  row-gap: 7.5rem;
  width: 55%;
  margin: 5% auto 0 auto;
  padding: 10rem 5rem 10rem 5rem;
  justify-items: center;
  align-items: center;
  border: 0.1rem solid ${(props) => props.theme.color.secondaryLight};
  border-radius: 1.25rem;
  box-shadow: 0.25rem 0.25rem 1rem ${(props) => props.theme.color.primaryDark};
  
  & h1 {
    grid-column: 1 / 3;
  }
`;

export {
  FormGridContainer,
};
