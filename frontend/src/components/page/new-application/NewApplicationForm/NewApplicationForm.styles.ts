import styled from 'styled-components';
import { ApplicationFormGridContainer } from '@components/shared/form';

const FormContainer = styled(ApplicationFormGridContainer)`
  & h1,
  & article:first-of-type,
  & article:last-of-type {
    grid-column: 1 / 3;
  }
`;

export {
  FormContainer,
};
