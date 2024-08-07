import styled from 'styled-components';

import { ApplicationFormGrid } from '@components/form';

const FormContainer = styled(ApplicationFormGrid)`
  & h1,
  & article:first-of-type,
  & article:nth-last-of-type(2),
  & article:last-of-type {
    grid-column: 1 / 3;
  }

  & article:last-of-type {
    height: 2rem;
  }
`;

export {
  FormContainer,
};
