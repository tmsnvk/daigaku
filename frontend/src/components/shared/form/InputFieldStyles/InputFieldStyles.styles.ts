import styled from 'styled-components';

type InputFieldT = {
  $isError?: boolean;
}

const InputFieldStyles = styled.article<InputFieldT>`
  height: 12.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 1.5rem 0;

  & input,
  & select {
    width: 75%;
    height: 5rem;
    padding: 0 0 0 2.5rem;
    font-size: ${({ theme }) => theme.fontSize.small};
    background-color: ${({ theme }) => theme.color.secondaryLight};
    border: 0.2rem solid ${({ theme, $isError }) => $isError ? theme.color.error : theme.color.primaryDark};
    border-radius: 1.25rem;

    &:hover:not([disabled]) {
      box-shadow: 0 0 0.5rem ${({ theme }) => theme.color.secondaryDark};
    }

    &::placeholder {
      color: ${({ theme }) => theme.color.secondaryDark};
      font-size: ${({ theme }) => theme.fontSize.small};
    }

    &:focus {
      outline: 0.15rem solid ${({ theme }) => theme.color.secondaryDark};
    }

    &:focus::placeholder {
      color: transparent;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
  
  & input[type=number] {
    width: 10rem;
  }
  
  & input[disabled] {
    background-color: ${({ theme }) => theme.color.tertiaryLight};
  }

  & select {
    cursor: pointer;
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.medium}) {
    & input,
    & select {
      width: 100%;
    }
  }
`;

export default InputFieldStyles;
