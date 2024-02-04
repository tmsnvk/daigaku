import styled from 'styled-components';

type TextContainerPropsT = {
  $fontSize?: string;
}

const TextContainer = styled.p<TextContainerPropsT>`
  margin: 0 0 2.5rem 0;
  font-size: ${(props) => props.$fontSize};
`;

export {
  TextContainer,
};
