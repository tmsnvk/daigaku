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
 * Styled Component {@link TableBodyRow}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const TableHeadRow = styled.tr`
  & th {
    &::before,
    &::after {
      height: 1rem;
      display: table-row;
      content: '';
    }
  }

  & th:last-of-type {
    & button,
    & article {
      height: 4rem;
    }
  }
`;
