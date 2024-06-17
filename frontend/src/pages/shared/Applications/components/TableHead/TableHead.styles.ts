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
  & button:first-of-type {
    padding: 0 0 1rem 0;
  }
  
  & button:last-of-type {
    padding: 1rem 0 0 0;
  }
  
  & button {
    padding: 1rem 0 1rem 0;
  }
`;

export {
  TableHeadRow,
  ButtonHeaderCell,
};
