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
  display: flex;
  flex-direction: column;
  width: 45%;
  background-color: ${({ theme }) => theme.color.secondaryLight};

  & p {
    margin: 1.5rem 2.5rem 1.5rem 2.5rem;
  }

  & input {
    margin: 2.5rem auto 0 auto;
  }
`;
