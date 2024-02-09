import styled from 'styled-components';

const DefaultDialogStyles = styled.dialog`
  width: 35%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 25% auto 0 auto;
  padding: 0 0 5rem 0;
  background-color: ${(props) => props.theme.color.primaryLight};
  color: ${(props) => props.theme.color.secondaryDark};
  font-size: ${(props) => props.theme.fontSize.large};
  border: 0.1rem solid ${(props) => props.theme.color.secondaryDark};
  border-radius: 1.5rem;

  & p {
    margin: 5rem 2rem 2.5rem 2rem;
  }
`;

export default DefaultDialogStyles;
