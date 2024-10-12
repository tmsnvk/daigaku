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

/**
 * @since 0.0.1
 */
export const Article = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;

  & h2 {
    font-size: ${({ theme }) => theme.fontSize.xLarge};
  }

  & p {
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;
