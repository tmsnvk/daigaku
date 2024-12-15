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
