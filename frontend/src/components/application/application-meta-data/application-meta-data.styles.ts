/**
 * @prettier
 */

/* external imports */
import styled from 'styled-components';

export const Article = styled.article`
  margin: 0 auto 0 0;
  font-size: ${({ theme }) => theme.fontSize.medium};

  & div:not(:first-of-type),
  & div:not(:last-of-type) {
    margin: 0.5rem 0 0.5rem 0;
  }

  & dt,
  & dd {
    display: inline-block;
  }

  & dt {
    font-weight: 800;
  }
`;
