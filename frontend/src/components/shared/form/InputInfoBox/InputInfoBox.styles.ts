import styled from 'styled-components';

const ArticleContainer = styled.article`
  padding: 2rem 1.5rem 2rem 1.5rem;
  background-color: ${({ theme }) => theme.color.secondaryLight};
  border: 0.2rem solid ${({ theme }) => theme.color.primaryDark};
  border-radius: 1.25rem;

  & p {
    margin: 0 0 1rem 0;
    font-size: ${({ theme }) => theme.fontSize.small};
  }

  & p:last-of-type {
    margin: 0;
  }
`;

export {
  ArticleContainer,
};
