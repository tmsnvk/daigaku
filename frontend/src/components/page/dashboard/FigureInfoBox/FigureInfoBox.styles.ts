import styled from 'styled-components';

const BoxContainer = styled.dl`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 1rem 2.5rem 1rem;
  width: 30rem;
  height: 30rem;
  text-align: center;
  background-color: ${(props) => props.theme.color.secondaryLight};
  border: 0.25rem solid ${(props) => props.theme.color.secondaryLight};
  border-radius: 0.75rem;
  box-shadow: 0 0.1rem 1.5rem 0 ${(props) => props.theme.color.primaryDark};
  
  & dt {
    font-size: ${(props) => props.theme.fontSize.xxxLarge};
  }
  
  & dd {
    font-size: ${(props) => props.theme.fontSize.medium};
  }
`;

export {
  BoxContainer,
};
