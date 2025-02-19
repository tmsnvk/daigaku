/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import styled from 'styled-components';

/* component, style imports */
import { BaseDialog } from '@components/base-styles';

export const Dialog = styled(BaseDialog)`
  background-color: ${({ theme }) => theme.color.secondaryLight};

  svg {
    margin: 0 0 0 1rem;
  }
`;
