import styled from 'styled-components';

const TitleContainer = styled.h1`
  font-size: ${(props) => props.theme.fontSize.xLarge};

  &::after {
    content: '';
    display: block;
    width: 66%;
    margin: 2.5rem auto 2.5rem auto;
    border-bottom: 0.5rem solid ${(props) => props.theme.color.primaryDark};
  }
`;

export {
  TitleContainer,
};
