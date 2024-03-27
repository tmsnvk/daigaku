import styled from 'styled-components';
import { BaseElementBorderStyle } from '@components/shared/base-styles';

const BoxContainer = styled.article`
  ${BaseElementBorderStyle};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem 2.5rem 1rem;
  width: 15rem;
  height: 15rem;
  text-align: center;
  
  & p:not(p:last-of-type) {
    font-weight: 800;
    font-size: ${(props) => props.theme.fontSize.small};
  }

  & p:last-of-type {
    padding: 1rem 0 0 0;
    font-size: ${(props) => props.theme.fontSize.medium};
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.small}) {
    width: 20rem;
    height: 20rem;

    & p:not(p:last-of-type) {
      margin: 2.5rem 0 0 0;
      font-size: ${(props) => props.theme.fontSize.medium};
    }

    & p:last-of-type {
      font-size: ${(props) => props.theme.fontSize.medium};
    }
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.medium}) {  
    justify-content: space-evenly;
    width: 25rem;
    height: 25rem;

    & p:not(p:last-of-type) {
      margin: 0;
      font-size: ${(props) => props.theme.fontSize.large};
    }

    & p:last-of-type {
      padding: 0;
      font-size: ${(props) => props.theme.fontSize.medium};
    }
  }
`;

export {
  BoxContainer,
};
