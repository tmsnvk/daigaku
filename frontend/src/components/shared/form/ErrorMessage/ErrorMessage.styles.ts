import styled from 'styled-components';

const ErrorMessageContainer = styled.p`
  height: 2rem;
  padding: 0.5rem 0 1rem 0;
  text-align: center;
  color: ${(props) => props.theme.color.error};
  font-size: ${(props) => props.theme.fontSize.small};
  font-weight: 800;
`;

export {
  ErrorMessageContainer,
};
