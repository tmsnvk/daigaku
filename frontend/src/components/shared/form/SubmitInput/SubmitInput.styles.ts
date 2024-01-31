import styled from 'styled-components';

const SubmitInput = styled.input`
  height: 5rem;
  padding: 0 2.5rem 0 2.5rem;
  background-color: ${(props) => props.theme.color.primaryDark};
  color: ${(props) => props.theme.color.primaryLight};
  font-size: ${(props) => props.theme.fontSize.large};
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  text-align: center;
  border: 0.3rem solid ${(props) => props.theme.color.primaryDark};
  border-radius: 1rem;
  cursor: pointer;

  &:hover:not([disabled]) {
    background-color: ${(props) => props.theme.color.secondaryDark};
    color: ${(props) => props.theme.color.primaryLight};
    box-shadow: 0 0 0.5rem ${(props) => props.theme.color.secondaryDark};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: 0.15rem solid ${(props) => props.theme.color.secondaryDark};
  }
`;

export default SubmitInput;
