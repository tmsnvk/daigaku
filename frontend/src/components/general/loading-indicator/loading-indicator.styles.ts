import styled from 'styled-components';

const Article = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.primaryDark};
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  
  & svg {
    display: inline-block;
    margin: 0 0 0 1rem;
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;

export {
  Article,
};
