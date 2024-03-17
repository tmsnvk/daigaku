import styled from 'styled-components';

const FooterContainer = styled.footer`
  height: 7.5rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.secondaryLight};
  box-shadow: 0 0.1rem 1.5rem 0 ${(props) => props.theme.color.primaryDark};
  
  & p {
    font-size: ${(props) => props.theme.fontSize.small};
  }
`;

export {
  FooterContainer,
};
