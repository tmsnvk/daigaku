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

/**
 * ===============
 * Styled Component {@link Main}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-template-rows: auto;
  column-gap: 2.5rem;

  & > * {
    min-width: 0;
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    grid-template-columns: 1fr;
  }
`;
