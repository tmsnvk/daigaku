import styled from 'styled-components';

const BoxContainer = styled.article`
  width: 25rem;
  height: 35rem;
  text-align: center;
  background-color: ${(props) => props.theme.color.secondaryLight};
  border: 0.25rem solid ${(props) => props.theme.color.secondaryLight};
  border-radius: 0.75rem;
  box-shadow: 0 0.1rem 1.5rem 0 ${(props) => props.theme.color.primaryDark};
`;

export {
  BoxContainer,
};
