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
import { ApplicationFormGrid } from '@components/form';

/**
 * ===============
 * Styled Component {@link Form}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const Form = styled(ApplicationFormGrid)`
  & h1,
  & article:first-of-type,
  & article:nth-last-of-type(2),
  & article:last-of-type {
    grid-column: 1 / 3;
  }

  & article:last-of-type {
    height: 2rem;
  }
`;
