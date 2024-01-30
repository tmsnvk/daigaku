import styled from 'styled-components';

const ButtonContainer = styled.button`
  height: 5rem;
  padding: 0 1.5rem 0 1.5rem;
  font-size: 2rem;
  color: ${(props) => props.theme.color.secondaryDark};
  font-family: inherit;
  background-color: ${(props) => props.theme.color.secondaryLight};
  border-radius: 0.75rem;
  cursor: pointer;

  &:focus,
  &:hover {
    outline: 0.25rem solid ${(props) => props.theme.color.secondaryDark};
  }
`;

export {
  ButtonContainer,
};
