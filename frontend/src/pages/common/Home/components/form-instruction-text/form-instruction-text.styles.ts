import styled from 'styled-components';

const Paragraph = styled.p`
  margin: 0 0 2.5rem 0;
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export {
  Paragraph,
};
