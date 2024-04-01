import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableHeadContainer = styled.tr`
  & th {
    &::before,
    &::after {
      height: 1rem;
      display: table-row;
      content: '';
    }
  }
  
  & button {
    background-color: transparent;
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: 800;
    cursor: pointer;
    
    &:hover {
      color: ${({ theme }) => theme.color.tertiaryLight};
    }
  }
`;

const SortIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  margin: 0 0 0 1rem;
`;

export {
  TableHeadContainer,
  SortIcon,
};
