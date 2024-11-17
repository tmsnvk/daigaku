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

/**
 * ===============
 * Styled Component {@link TableBodyRow}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const TableBodyRow = styled.tr`
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.color.primaryLight};
  }

  & td:last-of-type a {
    height: 4rem;
  }

  &:last-of-type td:first-of-type {
    border-bottom-left-radius: ${({ theme }) => theme.options.borderRadius};
  }

  &:last-of-type td:last-of-type {
    border-bottom-right-radius: ${({ theme }) => theme.options.borderRadius};
  }
`;

/**
 * ===============
 * Styled Component {@link Cell}
 * ===============
 */

/**
 * The interface represents the properties of the {@link Cell} styled-component.
 *
 * @since 0.0.1
 */
interface RowType {
  readonly $shouldDisplay: boolean;
}

/**
 * @since 0.0.1
 */
export const Cell = styled.td<RowType>`
  display: ${({ $shouldDisplay }) => ($shouldDisplay ? '' : 'none')};
`;
