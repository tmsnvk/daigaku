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
export const TileUnit = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1 100vw;
  column-gap: 5rem;
  row-gap: 5rem;

  @media screen and (width > ${({ theme }) => theme.breakpoint.medium}) {
    &:not(:first-of-type):not(:last-of-type) {
      margin: 0 0 5rem 0;
    }
  }
`;
