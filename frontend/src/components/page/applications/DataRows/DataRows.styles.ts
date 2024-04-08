import styled from 'styled-components';

type RowTypeT = {
  $shouldDisplay: boolean;
}

const TableBodyRow = styled.tr`
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.color.primaryLight};
  }
`;

const DataCell = styled.td<RowTypeT>`
  display: ${({ $shouldDisplay }) => $shouldDisplay ? '' : 'none'};
`;

export {
  TableBodyRow,
  DataCell,
};
