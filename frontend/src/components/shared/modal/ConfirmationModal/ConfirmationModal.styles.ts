import styled from 'styled-components';

const DialogContainer = styled.dialog`
  width: 35%;
  height: 25rem;
  margin: 25% auto 0 auto;
  background-color: ${(props) => props.theme.color.primaryLight};
  color: ${(props) => props.theme.color.secondaryDark};
  font-size: ${(props) => props.theme.fontSize.large};
  border: 0.1rem solid ${(props) => props.theme.color.secondaryDark};
  border-radius: 1.5rem;

  //& .close-x-button {
  //  position: absolute;
  //  right: 0;
  //  margin: 2.5rem 2.5rem 0 0;
  //  text-align: right;
  //  font-size: 2.5rem;
  //  font-weight: 800;
  //  background: transparent;
  //  color: inherit;
  //  cursor: pointer;
  //}

  & p {
    margin: 7.5rem 2rem 0 2rem;
  }
`;

export {
  DialogContainer,
};
