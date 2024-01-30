import styled from 'styled-components';

const InputContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3.5rem 0 0 0;

  & label {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
  
  & input {
    height: 5rem;
    width: 35rem;
    margin: 1rem 0 0 0;
    padding: 0 0 0 2.5rem;
    font-size: ${(props) => props.theme.fontSize.medium};
    background-color: ${(props) => props.theme.color.secondaryLight};
    border: 0.2rem solid ${(props) => props.theme.color.primaryDark};
    border-radius: 1.25rem;

    &::placeholder {
      color: ${(props) => props.theme.color.secondaryDark};
      font-size: ${(props) => props.theme.fontSize.medium};
      letter-spacing: 0.15rem;
    }

    &:focus {
      outline: 0.25rem solid ${(props) => props.theme.color.secondaryDark};
    }

    &:focus::placeholder {
      color: transparent;
    }
  }
`;

export {
  InputContainer,
};
