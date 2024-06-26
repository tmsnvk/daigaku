import styled from 'styled-components';
import { BaseDarkBorder } from '@components/base-styles';

const Dialog = styled.dialog`
  ${BaseDarkBorder};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5rem 7.5rem 5rem 7.5rem;
  margin: 10% auto 0 auto;

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
    margin: 5rem auto 0 auto;
    padding: 1rem 2.5rem 1rem 2.5rem;
    background-color: transparent;
    font-size: inherit;
    font-weight: 800;
    border: 0.2rem solid ${({ theme }) => theme.color.tertiaryLight};
    border-radius: 0.75rem;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.color.tertiaryLight};
    }
  }
`;

export {
  Dialog,
};
