import styled from 'styled-components';

type InputFieldT = {
  $isError: boolean;
}

const InputFieldStyles = styled.article<InputFieldT>`
  height: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 1.5rem 0;
  
  & input {
    width: 35rem;
    height: 5rem;
    padding: 0 0 0 2.5rem;
    font-size: ${(props) => props.theme.fontSize.medium};
    background-color: ${(props) => props.theme.color.secondaryLight};
    border: 0.2rem solid ${(props) => props.$isError ? props.theme.color.error : props.theme.color.primaryDark};
    border-radius: 1.25rem;

    &:hover {
      box-shadow: 0 0 0.5rem ${(props) => props.theme.color.secondaryDark};
    }
    
    &::placeholder {
      color: ${(props) => props.theme.color.secondaryDark};
      font-size: ${(props) => props.theme.fontSize.medium};
      letter-spacing: 0.15rem;
    }

    &:focus {
      outline: 0.15rem solid ${(props) => props.theme.color.secondaryDark};
    }

    &:focus::placeholder {
      color: transparent;
    }
  }
`;

export default InputFieldStyles;
