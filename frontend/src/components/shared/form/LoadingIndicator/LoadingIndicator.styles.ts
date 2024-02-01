import styled from 'styled-components';

const ComponentContainer = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: ${(props) => props.theme.color.primaryDark};
  font-size: ${(props) => props.theme.fontSize.medium};
  font-weight: 800;
  
  & p {
    font-size: ${(props) => props.theme.fontSize.large};
  }
`;

export {
  ComponentContainer,
};
