import styled from 'styled-components';

const ComponentContainer = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.primaryDark};
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: 800;
  
  & svg {
    display: inline-block;
    margin: 0 0 0 1rem;
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;

export {
  ComponentContainer,
};
