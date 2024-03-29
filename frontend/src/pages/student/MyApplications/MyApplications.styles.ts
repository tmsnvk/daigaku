import styled from 'styled-components';
import { BaseElementBorderStyle } from '@components/shared/base-styles';

const MainContainer = styled.main`
  ${BaseElementBorderStyle};
  
  width: 95%;
  margin: 5% auto 5% auto;
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export {
  MainContainer,
};
