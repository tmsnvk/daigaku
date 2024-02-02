import styled from 'styled-components';

const FormContainer = styled.section`
  height: 65rem;
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
  
  & > article {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10rem 0 0 0;
  }
`;

export {
  FormContainer,
};
