import styled from 'styled-components';
import { BaseDarkElementBorderStyle } from '@components/shared/base-styles';

const ModalContainer = styled.dialog`
  ${BaseDarkElementBorderStyle};
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5rem 7.5rem 5rem 7.5rem;
  margin: 5% auto 0 auto;
  
  & article {
    display: flex;
    flex-direction: row;
    margin: 1.5rem 0 0 0;
    
    & input {
      margin: 0 1.5rem 0 0;
      
      &:focus,
      &:hover {
        outline: none;
      }
    }
  }
  
  & button {
    margin: 2.5rem auto 0 auto;
    background-color: transparent;
    font-size: inherit;
    font-weight: 800;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.color.tertiaryLight};
    }
  }
`;

export {
  ModalContainer,
};
