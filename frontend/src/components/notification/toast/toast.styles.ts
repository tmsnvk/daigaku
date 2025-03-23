/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import styled, { keyframes } from 'styled-components';

/* component, style imports */
// import { BaseLightBorder } from '@components/base-components';

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const Section = styled.section`
  /* ${BaseLightBorder}; */

  z-index: 100;
  position: fixed;
  overflow: visible;
  width: 30rem;
  height: 10rem;
  right: 5rem;
  bottom: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.5rem 0 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.medium};
  background-color: ${({ theme }) => theme.color.tertiaryLight};
  animation: ${fadeOut} 2.5s 0.5s ease-out forwards;
`;
