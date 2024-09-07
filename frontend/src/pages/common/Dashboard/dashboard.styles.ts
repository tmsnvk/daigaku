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
 * Styled Component {@link Main}
 * ===============
 */

export const Main = styled.main`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 5rem;
  margin: 5% 5% 5% 5%;

  & > section:not(:first-of-type) {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1 100vw;
    column-gap: 5rem;
    row-gap: 5rem;
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.medium}) {
    & > section:not(:first-of-type):not(:last-of-type) {
      margin: 0 0 5rem 0;
    }
  }
`;
