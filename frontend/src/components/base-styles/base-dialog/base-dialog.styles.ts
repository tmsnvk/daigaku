import styled from 'styled-components';

import { BaseLightBorder } from '@components/base-styles';

const BaseDialog = styled.dialog`
  ${BaseLightBorder};

  width: 40%;
  margin: 35rem auto 0 auto;
  padding: 5rem 2.5rem 5rem 2.5rem;
  transition: all 0.5s ease-out;

  &[open] {
    opacity: 1;
    transform: scaleY(1);
  }

  &[open]::backdrop {
    backdrop-filter: blur(0.5rem);
  }

  @starting-style {
    &[open] {
      opacity: 0;
      transform: scaleY(0);
    }
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.medium}) {
    width: 75%;
  }
`;

export default BaseDialog;
