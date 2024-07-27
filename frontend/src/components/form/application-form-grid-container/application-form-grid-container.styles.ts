import styled from 'styled-components';

import { BaseLightBorder } from '@components/base-styles';

const ApplicationFormGrid = styled.form`
  ${BaseLightBorder};

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 2.5rem;
  row-gap: 5rem;
  width: 95%;
  margin: 10rem auto 10rem auto;
  padding: 5rem 5rem 5rem 5rem;
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

export default ApplicationFormGrid;
