/**
 * @prettier
 */

import styled from 'styled-components';

export const TableHeadRow = styled.tr`
  & th {
    &::before,
    &::after {
      height: 1rem;
      display: table-row;
      content: '';
    }
  }
`;

export const ButtonHeaderCell = styled.th`
  & button,
  & article {
    height: 4rem;
  }
`;
