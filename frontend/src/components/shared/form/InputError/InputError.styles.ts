import styled from 'styled-components';

const Paragraph = styled.p`
  height: 2rem;
  padding: 0.5rem 0 1rem 0;
  text-align: center;
  color: ${({ theme }) => theme.color.error};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: 800;
`;

export {
  Paragraph,
};
