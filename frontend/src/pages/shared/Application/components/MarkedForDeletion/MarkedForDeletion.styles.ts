import styled from 'styled-components';

type ArticleT = {
  $isMarked: boolean;
}

const Article = styled.article<ArticleT>`
  margin: 0 0 0 auto;
  
  & button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 5rem;
    padding: 0 2.5rem 0 2.5rem;
    color: ${({ theme }) => theme.color.primaryLight};
    font-size: ${({ theme }) => theme.fontSize.large};
    letter-spacing: 0.3rem;
    text-transform: uppercase;
    background-color: ${({ theme, $isMarked }) => $isMarked ? theme.color.error : theme.color.primaryDark};
    border: 0.3rem solid ${({ theme }) => theme.color.primaryDark};
    border-radius: 1rem;
    cursor: pointer;
    
    & label {
      margin: 0;
    }
    
    & input {
      display: none;
    }
  }
`;

export {
  Article,
};
