import styled from 'styled-components';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  & h2 {
    font-size: ${({ theme }) => theme.fontSize.xLarge};
  }

  & p {
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;

export {
  Article,
};