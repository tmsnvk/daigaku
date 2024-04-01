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
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto 0 auto;
    background-color: transparent;
    font-size: ${({ theme }) => theme.fontSize.large};
    font-weight: 800;
    cursor: pointer;
    
    &:hover {
      color: ${({ theme }) => theme.color.tertiaryLight};
    }
  }
`;

const ButtonTh = styled.th`
  & button:nth-of-type(1) {
    margin: 0 auto 1.5rem auto;
  }
  
  & button:nth-of-type(2) {
    margin: 1.5rem auto 0 auto;
  }
`;

const TableHeadIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  margin: 0 0 0 1rem;
`;

export {
  TableHeadContainer,
  ButtonTh,
  TableHeadIcon,
};
