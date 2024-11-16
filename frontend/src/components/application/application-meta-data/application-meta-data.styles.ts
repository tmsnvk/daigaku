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
