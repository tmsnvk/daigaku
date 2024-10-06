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

/* component, style imports */
import { BaseDialog } from '@components/base-styles';

/**
 * ===============
 * Styled Component {@link Dialog}
 * ===============
 */

/**
 * @component
 *
 * @since 0.0.1
 */
export const Dialog = styled(BaseDialog)`
  background-color: ${({ theme }) => theme.color.secondaryLight};

  svg {
    margin: 0 0 0 1rem;
  }
`;
