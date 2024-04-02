import styled from 'styled-components';
import { BaseLightElementBorderStyle } from '@components/shared/base-styles';

const FormGridContainer = styled.form`
  ${BaseLightElementBorderStyle};
  
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 2.5rem;
  row-gap: 5rem;
  width: 95%;
  margin: 5% auto 5% auto;
  padding: 5rem 5rem 10rem 5rem;
  justify-items: center;
  align-items: center;

  & h1,
  & article:first-of-type,
  & article:last-of-type {
    grid-column: 1 / 3;
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.large}) {
    width: 75%;
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.xLarge}) {
    width: 55%;
  }
`;

export {
  FormGridContainer,
};
