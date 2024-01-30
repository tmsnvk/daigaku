import styled from 'styled-components';

const MainContainer = styled.main`
  width: 50rem;
  margin: 15% auto 15% auto;
  padding: 7.5rem 5rem 7.5rem 5rem;
  text-align: center;
  border: 0.25rem solid ${(props) => props.theme.color.secondaryLight};
  border-radius: 0.75rem;
  
  & form {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: ${(props) => props.theme.fontSize.large};

    & article {
      text-align: center;
    }
  }
`;

export {
  MainContainer,
};
