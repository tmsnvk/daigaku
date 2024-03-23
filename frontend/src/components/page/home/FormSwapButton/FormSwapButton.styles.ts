import styled from 'styled-components';

const ButtonContainer = styled.button`
  height: 5rem;
  padding: 0 1.5rem 0 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: 800;
  color: ${({ theme }) => theme.color.secondaryDark};
  font-family: inherit;
  background-color: ${({ theme }) => theme.color.secondaryLight};
  border-radius: 0.75rem;
  cursor: pointer;

  &:focus,
  &:hover {
    outline: 0.25rem solid ${({ theme }) => theme.color.secondaryDark};
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

export {
  ButtonContainer,
};
