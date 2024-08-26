/**
 * @prettier
 */

import styled from 'styled-components';

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
