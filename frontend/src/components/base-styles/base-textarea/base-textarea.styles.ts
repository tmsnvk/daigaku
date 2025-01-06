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

/**
 * Defines the properties of the {@link BaseTextarea} styled-component, enabling styling variations based on error and disabled states.
 */
interface BaseTextarea {
  /**
   * Indicates whether the input is in an error state.
   */
  readonly $isError?: boolean;

  /**
   * Indicates whether the input is disabled.
   */
  readonly $isDisabled?: boolean;
}

export const BaseTextarea = styled.article<BaseTextarea>`
  width: 100%;
  height: 27.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & textarea {
    width: 75%;
    padding: 0 0 0 1.5rem;
    font-size: ${({ theme }) => theme.fontSize.small};
    background-color: ${({ theme, $isDisabled }) => ($isDisabled ? theme.color.tertiaryLight : theme.color.secondaryLight)};
    border: 0.2rem solid ${({ theme, $isError }) => ($isError ? theme.color.error : theme.color.primaryDark)};
    border-radius: 1.25rem;

    &:hover:not([disabled]) {
      box-shadow: 0 0 0.5rem ${({ theme }) => theme.color.secondaryDark};
    }

    &:focus {
      outline: 0.15rem solid ${({ theme }) => theme.color.secondaryDark};
    }

    &::placeholder {
      color: ${({ theme }) => theme.color.secondaryDark};
      font-size: ${({ theme }) => theme.fontSize.small};
    }

    &:focus::placeholder {
      color: transparent;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.medium}) {
    & textarea {
      width: 90%;
    }
  }
`;
