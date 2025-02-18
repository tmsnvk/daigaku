/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import styled from 'styled-components';

export const TableHeadRow = styled.tr`
  & th {
    &::before,
    &::after {
      height: 1rem;
      display: table-row;
      content: '';
    }

    & button:disabled {
      color: ${({ theme }) => theme.color.disabled};
      cursor: not-allowed;
    }
  }

  & th:last-of-type {
    & button,
    & article {
      height: 4rem;
    }
  }
`;
