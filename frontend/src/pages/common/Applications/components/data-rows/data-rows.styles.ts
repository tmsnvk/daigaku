import styled from 'styled-components';

interface RowType {
  readonly $shouldDisplay: boolean;
}

const TableBodyRow = styled.tr`
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.color.primaryLight};
  }

  & td:last-of-type a {
    height: 4rem;
  }
`;

const DataCell = styled.td<RowType>`
  display: ${({ $shouldDisplay }) => $shouldDisplay ? '' : 'none'};
  `;

export {
  TableBodyRow,
  DataCell,
};
