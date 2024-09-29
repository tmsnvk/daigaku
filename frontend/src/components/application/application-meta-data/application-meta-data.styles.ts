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
