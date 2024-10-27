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
import styled, { keyframes } from 'styled-components';

/**
 * ===============
 * Styled Component {@link Paragraph}
 * ===============
 */

/**
 * @since 0.0.1
 */
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

/**
 * @since 0.0.1
 */
export const Paragraph = styled.p`
  padding: 1rem 0 0 0;
  text-align: center;
  color: ${({ theme }) => theme.color.error};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  animation: ${fadeIn} 0.25s ease-in;
`;
