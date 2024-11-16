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

/* component, style imports */
import { BaseDialog } from '@components/base-styles';

/**
 * ===============
 * Styled Component {@link Dialog}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const Dialog = styled(BaseDialog)`
  text-align: center;

  & p {
    padding: 0 0 2.5rem 0;
    font-size: ${({ theme }) => theme.fontSize.large};
  }
`;
