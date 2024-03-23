import styled from 'styled-components';

const SubmitInput = styled.input`
  height: 5rem;
  padding: 0 2.5rem 0 2.5rem;
  text-align: center;
  background-color: ${({ theme }) => theme.color.primaryDark};
  color: ${({ theme }) => theme.color.primaryLight};
  font-size: ${({ theme }) => theme.fontSize.large};
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  border: 0.3rem solid ${({ theme }) => theme.color.primaryDark};
  border-radius: 1rem;
  cursor: pointer;

  &:hover:not([disabled]) {
    background-color: ${({ theme }) => theme.color.secondaryDark};
    color: ${({ theme }) => theme.color.primaryLight};
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.color.secondaryDark};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: 0.15rem solid ${({ theme }) => theme.color.secondaryDark};
  }
`;

export default SubmitInput;
