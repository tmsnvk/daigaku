/**
 * @prettier
 */

/* external imports */
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const Paragraph = styled.p`
  height: 2rem;
  padding: 1rem 0 0 0;
  text-align: center;
  color: ${({ theme }) => theme.color.error};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  animation: ${fadeIn} 0.25s ease-in;
`;
