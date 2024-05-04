import styled from 'styled-components';
import { BaseLightElementBorderStyle } from '@components/base-styles';

const ApplicationFormGridContainer = styled.form`
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

  & article {
    min-width: 100%;
  }

  & article:nth-last-of-type(2),
  & article:last-of-type {
    min-width: fit-content;
  }
  
  @media screen and (width > ${({ theme }) => theme.breakpoint.large}) {
    width: 75%;
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.xLarge}) {
    width: 55%;
  }
`;

export default ApplicationFormGridContainer;
