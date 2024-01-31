import styled from 'styled-components';

const ErrorMessageContainer = styled.p`
  height: 2rem;
  padding: 0.5rem 0 1rem 0;
  color: ${({ theme }) => theme.color.error};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: bold;
`;

export {
  ErrorMessageContainer,
};
