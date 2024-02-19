import styled from 'styled-components';

const FormGridContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 5rem;
  row-gap: 5rem;
  width: 55%;
  margin: 10% auto 0 auto;
  padding: 10rem 5rem 10rem 5rem;
  justify-items: center;
  align-items: center;
  border: 0.1rem solid ${(props) => props.theme.color.secondaryLight};
  border-radius: 1.25rem;
  box-shadow: 0.25rem 0.25rem 1rem ${(props) => props.theme.color.primaryDark};
`;

const InputInfoBox = styled.section`
  padding: 2rem 1.5rem 2rem 1.5rem;
  background-color: ${(props) => props.theme.color.secondaryLight};
  border: 0.2rem solid ${(props) => props.theme.color.primaryDark};
  border-radius: 1.25rem;
  
  & p {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
`;

export {
  FormGridContainer,
  InputInfoBox,
};
