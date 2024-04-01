import styled from 'styled-components';
import { BaseElementBorderStyle } from '@components/shared/base-styles';

const MainContainer = styled.main`
  ${BaseElementBorderStyle};

  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 5% auto 5% auto;
  font-size: ${({ theme }) => theme.fontSize.medium};

  & table {
    table-layout: fixed;
    border-collapse: collapse;

    & th,
    & td {
      width: 10%;
      padding: 2.5rem 1rem 2.5rem 1rem;
      text-align: center;
    }

    & svg {
      display: inline-block;
      margin: 0 0 0 1rem;
    }

    & button {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 auto 0 auto;
      background-color: transparent;
      font-size: ${({ theme }) => theme.fontSize.medium};
      font-weight: 800;
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.color.tertiaryLight};
      }
    }
  }
`;

export {
  MainContainer,
};
