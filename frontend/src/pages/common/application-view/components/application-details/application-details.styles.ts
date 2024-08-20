import styled from 'styled-components';

import { ApplicationFormGrid } from '@components/form';

const ApplicationSection = styled(ApplicationFormGrid)`
  & h1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }

  & article {
    grid-column: 1 / 3;
    grid-row: auto;
    min-width: fit-content;
  }
`;

export {
  ApplicationSection,
};
