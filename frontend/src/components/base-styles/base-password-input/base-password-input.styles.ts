/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import styled from 'styled-components';

/* component, style imports */
import { BaseInput } from '../base-input';

export const BasePasswordInput = styled(BaseInput)`
  & input {
    width: 65%;
  }

  & div {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.large};
    color: ${({ theme }) => theme.color.primaryDark};

    & svg {
      width: 2.5rem;
      margin: 0 0 0 1rem;
      cursor: pointer;
    }
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.medium}) {
    & input,
    & select {
      width: 80%;
    }
  }
`;
