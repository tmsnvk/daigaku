/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import styled from 'styled-components';

/**
 * ===============
 * Styled Component {@link Article}
 * ===============
 */

export const Article = styled.article`
  padding: 2rem 1.5rem 2rem 1.5rem;
  background-color: ${({ theme }) => theme.color.secondaryLight};
  border: 0.2rem solid ${({ theme }) => theme.color.primaryDark};
  border-radius: ${({ theme }) => theme.options.borderRadius};

  & p {
    margin: 0 0 1rem 0;
    font-size: ${({ theme }) => theme.fontSize.medium};
  }

  & p:last-of-type {
    margin: 0;
  }
`;
