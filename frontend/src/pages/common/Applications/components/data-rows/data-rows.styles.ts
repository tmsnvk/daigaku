/**
 * @prettier
 */

/* external imports */
import styled from 'styled-components';

/* interfaces, types, enums */
interface RowType {
  readonly $shouldDisplay: boolean;
}

export const TableBodyRow = styled.tr`
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.color.primaryLight};
  }

  & td:last-of-type a {
    height: 4rem;
  }
`;

export const Cell = styled.td<RowType>`
  display: ${({ $shouldDisplay }) => ($shouldDisplay ? '' : 'none')};
`;
