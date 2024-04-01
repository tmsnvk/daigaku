import styled from 'styled-components';

const TableHeadContainer = styled.tr`
  & th {
    &::before,
    &::after {
      height: 1rem;
      display: table-row;
      content: '';
    }
  }
`;

const ButtonTh = styled.th`
  & button:nth-of-type(1) {
    margin: 0 auto 2.5rem auto;
  }

  & button:nth-of-type(2) {
    margin: 2.5rem auto 0 auto;
  }
`;

export {
  TableHeadContainer,
  ButtonTh,
};
