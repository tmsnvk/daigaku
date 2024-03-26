import styled from 'styled-components';

const MainContainer = styled.main`
  width: 95%;
  margin: 5% auto 5% auto;
  background-color: ${(props) => props.theme.color.secondaryLight};
  border: 0.25rem solid ${(props) => props.theme.color.secondaryLight};
  border-radius: 0.75rem;
  box-shadow: 0 0.1rem 1.5rem 0 ${(props) => props.theme.color.primaryDark};
`;

export {
  MainContainer,
};
