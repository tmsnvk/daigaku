import styled from 'styled-components';
import { findColumn } from './DataRows.utilities.ts';
import { ColumnT } from '@pages/shared/Applications/Applications.hooks.tsx';

type RowTypeT = {
  $columns: ColumnT[];
  $id: string;
}

const RowContainer = styled.tr`
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.color.primaryLight};
  }
`;

const DataCell = styled.td<RowTypeT>`
  display: ${({ $columns, $id }) => findColumn($columns, $id) ? '' : 'none'};
`;

const EditButton = styled.button`
  background-color: transparent;
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: 800;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.color.tertiaryLight};
  }

  & svg {
    display: inline-block;
    margin: 0 0 0 1rem;
  }
`;

export {
  RowContainer,
  DataCell,
  EditButton,
};
