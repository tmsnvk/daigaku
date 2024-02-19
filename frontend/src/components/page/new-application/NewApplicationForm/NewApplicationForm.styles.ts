import styled from 'styled-components';

const FormGridContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 5rem;
  row-gap: 5rem;
  width: 75%;
  margin: 10% auto 0 auto;
  justify-items: center;
  border: 0.1rem solid red;
`;

export {
  FormGridContainer,
};
