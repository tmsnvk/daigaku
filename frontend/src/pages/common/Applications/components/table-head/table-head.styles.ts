import styled from 'styled-components';

const TableHeadRow = styled.tr`
  & th {
    &::before,
    &::after {
      height: 1rem;
      display: table-row;
      content: '';
    }
  }
`;

const ButtonHeaderCell = styled.th`
  & button,
  & article {
    height: 4rem;
  }
`;

export {
  TableHeadRow,
  ButtonHeaderCell,
};
