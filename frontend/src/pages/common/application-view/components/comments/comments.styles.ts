/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import styled from 'styled-components';

/**
 * ===============
 * Styled Component {@link Article}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const Article = styled.article`
  margin: 0 0 5rem 0;

  & article:first-of-type {
    margin: 0 auto 5rem auto;
  }

  & article {
    width: 75%;
    margin: 5rem auto 5rem auto;
    font-size: ${({ theme }) => theme.fontSize.medium};

    & > div {
      padding: 2rem 1.5rem 2rem 1.5rem;
      background-color: ${({ theme }) => theme.color.secondaryLight};
      border: 0.2rem solid ${({ theme }) => theme.color.primaryDark};
      border-radius: 1.25rem;

      & > p:first-of-type {
        font-weight: 800;
      }

      & > p:last-of-type {
        margin: 2rem 0 2rem 0;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
    }

    & > p:last-of-type {
      padding: 1.5rem 0 0 2.5rem;
      font-weight: 800;
    }
  }

  & article:not(:last-of-type)::after {
    content: '';
    display: block;
    width: 33%;
    margin: 1.5rem auto 2.5rem auto;
    border-bottom: 0.2rem solid ${({ theme }) => theme.color.primaryDark};
  }
`;

/**
 * ===============
 * Styled Component {@link ErrorContainer}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const ErrorContainer = styled.article`
  width: 75%;
  margin: 5rem auto 5rem auto;
  text-align: center;
  color: ${({ theme }) => theme.color.error};
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;
