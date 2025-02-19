/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import styled from 'styled-components';

/* component, style imports */
import { BaseDarkBorder } from '@components/base-styles';

export const Article = styled.article`
  ${BaseDarkBorder};

  width: 15rem;
  height: 15rem;
  padding: 0 1rem 2.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  & p:not(p:last-of-type) {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.small};
  }

  & p:last-of-type {
    padding: 1rem 0 0 0;
    font-size: ${({ theme }) => theme.fontSize.medium};
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.small}) {
    width: 20rem;
    height: 20rem;

    & p:not(p:last-of-type) {
      margin: 2.5rem 0 0 0;
      font-size: ${({ theme }) => theme.fontSize.medium};
    }

    & p:last-of-type {
      font-size: ${({ theme }) => theme.fontSize.medium};
    }
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.medium}) {
    justify-content: space-evenly;
    width: 25rem;
    height: 25rem;

    & p:not(p:last-of-type) {
      margin: 0;
      font-size: ${({ theme }) => theme.fontSize.large};
    }

    & p:last-of-type {
      padding: 0;
      font-size: ${({ theme }) => theme.fontSize.medium};
    }
  }
`;
