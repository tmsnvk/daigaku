import styled from 'styled-components';
import { ApplicationFormGridContainer } from '@components/shared/form';

const FormContainer = styled(ApplicationFormGridContainer)`
  & h1,
  & article:first-of-type,
  & article:nth-of-type(2),
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
