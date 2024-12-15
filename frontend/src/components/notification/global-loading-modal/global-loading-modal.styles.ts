/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
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
  background-color: ${({ theme }) => theme.color.secondaryLight};

  svg {
    margin: 0 0 0 1rem;
  }
`;
