import styled, { keyframes } from 'styled-components';

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

const ModalContainer = styled.section`
  width: 30rem;
  height: 10rem;
  position: absolute;
  z-index: 100;
  right: 10rem;
  bottom: 7.5rem;
  padding: 1.5rem 1.5rem 0 1.5rem;
  margin: 0 auto 5% auto;
  text-align: center;
  font-size: ${(props) => props.theme.fontSize.medium};
  background-color: ${(props) => props.theme.color.tertiaryLight};
  border: 0.1rem solid ${(props) => props.theme.color.secondaryLight};
  border-radius: 1.25rem;
  box-shadow: 0.25rem 0.25rem 1rem ${(props) => props.theme.color.primaryDark};
  animation: ${fadeIn} 0.1s ease-in forwards, ${fadeOut} 5s 0.5s ease-out forwards;
`;

export {
  ModalContainer,
};
