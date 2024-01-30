import styled from 'styled-components';

const InputFieldContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 3.5rem 0;

  & label {
    margin: 0 0 1rem 0;
    font-size: ${(props) => props.theme.fontSize.large};
  }
  
  & input {
    height: 5rem;
    width: 35rem;
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
  InputFieldContainer,
};
