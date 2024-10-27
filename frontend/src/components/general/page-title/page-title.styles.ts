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
 * Styled Component {@link TitleHeading}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const TitleHeading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xLarge};

  &::after {
    content: '';
    display: block;
    width: 66%;
    margin: 2.5rem auto 2.5rem auto;
    border-bottom: 0.5rem solid ${({ theme }) => theme.color.primaryDark};
  }
`;
