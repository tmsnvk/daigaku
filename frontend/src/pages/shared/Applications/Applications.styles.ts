import styled from 'styled-components';
import { BaseElementBorderStyle } from '@components/shared/base-styles';

const MainContainer = styled.main`
  ${BaseElementBorderStyle};
  
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 5% auto 5% auto;
  font-size: ${({ theme }) => theme.fontSize.large};
  
  & table {
    table-layout: fixed;
    border-collapse: collapse;

    & th,
    & td {
      width: 10%;
      padding: 2.5rem 1rem 2.5rem 1rem;
      text-align: center;
    }
  }
`;

export {
  MainContainer,
};
