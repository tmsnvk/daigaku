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

export const Form = styled(ApplicationFormGrid)`
  & h1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }

  & article:first-of-type {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    height: 10rem;
  }

  & article:nth-of-type(2) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    height: 10rem;
  }

  & article:nth-of-type(3),
  & article:nth-last-of-type(2),
  & article:last-of-type {
    grid-column: 1 / 3;
  }

  & article:last-of-type {
    height: 2rem;
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.large}) {
    width: 85%;
  }
`;
