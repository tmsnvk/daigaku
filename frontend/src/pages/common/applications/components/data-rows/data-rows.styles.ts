/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import styled from 'styled-components';

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
 * Defines the properties of the {@link Cell} styled-component.
 */
interface RowType {
  readonly $shouldDisplay: boolean;
}

export const Cell = styled.td<RowType>`
  display: ${({ $shouldDisplay }) => ($shouldDisplay ? '' : 'none')};
`;
