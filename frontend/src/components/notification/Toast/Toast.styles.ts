import styled, { keyframes } from 'styled-components';

import { BaseLightBorder } from '@components/base-styles';

const fadeIn = keyframes`
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const Section = styled.section`
  ${BaseLightBorder};
  
  width: 30rem;
  height: 10rem;
  z-index: 100;
  position: fixed;
  overflow: visible;
  right: 5rem;
  bottom: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.5rem 0 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.medium};
  background-color: ${({ theme }) => theme.color.tertiaryLight};
  animation: ${fadeIn} 0.1s ease-in forwards, ${fadeOut} 5s 0.5s ease-out forwards;
`;

export {
  Section,
};
