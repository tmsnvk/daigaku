import styled from 'styled-components';

import { ApplicationFormGrid } from '@components/form';

const Form = styled(ApplicationFormGrid)`
  & h1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }
  
  & article:first-of-type {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }

  & article:nth-of-type(2) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    min-width: fit-content;
  }
  
  & article:nth-of-type(3),
  & article:nth-last-of-type(2),
  & article:last-of-type {
    grid-column: 1 / 3;
  }

  & article:last-of-type {
    height: 2rem;
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.large}) {
    width: 85%;
  }
`;

export {
  Form,
};
