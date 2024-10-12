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
 * Styled Component {@link Label}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const Label = styled.label`
  margin: 0 0 1rem 0;
  font-size: ${({ theme }) => theme.fontSize.medium};
  cursor: inherit;
`;
