import styled from 'styled-components';

const DialogContainer = styled.dialog`
  width: 35%;
  height: 25rem;
  margin: 25% auto 0 auto;
  background-color: ${(props) => props.theme.color.primaryLight};
  color: ${(props) => props.theme.color.secondaryDark};
  font-size: ${(props) => props.theme.fontSize.large};
  border: 0.1rem solid ${(props) => props.theme.color.secondaryDark};
  border-radius: 1.5rem;

  & p {
    margin: 7.5rem 2rem 2rem 2rem;
  }
`;

export {
  DialogContainer,
};
