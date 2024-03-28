import styled from 'styled-components';

const ComponentContainer = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: ${({ theme }) => theme.color.primaryDark};
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: 800;
  
  & p {
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;

export {
  ComponentContainer,
};
