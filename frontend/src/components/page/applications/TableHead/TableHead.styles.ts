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
  & button:nth-of-type(1) {
    margin: 0 auto 2.5rem auto;
  }

  & button:nth-of-type(2) {
    margin: 2.5rem auto 0 auto;
  }
`;

export {
  TableHeadRow,
  ButtonHeaderCell,
};
