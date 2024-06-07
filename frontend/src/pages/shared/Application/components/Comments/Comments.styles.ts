import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
`;

const ContainerArticle = styled.article`
  margin: 0 0 5rem 0;
  
  & article:first-of-type {
    margin: 0 0 5rem 0;
  }
  
  & article {
    width: 95%;
    margin: 5rem 0 5rem 0; 
    font-size: ${({ theme }) => theme.fontSize.medium};
    animation: ${fadeIn} 1s ease-in forwards;

    & > div {
      padding: 2rem 1.5rem 2rem 1.5rem;
      background-color: ${({ theme }) => theme.color.secondaryLight};
      border: 0.2rem solid ${({ theme }) => theme.color.primaryDark};
      border-radius: 1.25rem;

      & > p:first-of-type {
        font-weight: 800;
      }

      & > p:last-of-type {
        margin: 2rem 0 2rem 0;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }

    & > p:last-of-type {
      padding: 1.5rem 0 0 2.5rem;
      font-weight: 800;
    }
  }
  
  & article:not(:last-of-type)::after {
    content: '';
    display: block;
    width: 33%;
    margin: 1.5rem auto 2.5rem auto;
    border-bottom: 0.2rem solid ${({ theme }) => theme.color.primaryDark};
  }
`;

export {
  ContainerArticle,
};
