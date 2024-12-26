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
 * Defines the properties of the {@link BaseInput} styled-component,
 * enabling styling variations based on error and disabled states.
 */
interface BaseInput {
  /**
   * Indicates whether the input is in an error state.
   */
  readonly $isError?: boolean;

  /**
   * Indicates whether the input is disabled.
   */
  readonly $isDisabled?: boolean;
}

export const BaseInput = styled.article<BaseInput>`
  height: 12.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & input,
  & select {
    width: 75%;
    height: 5rem;
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

  & input[type='number'] {
    width: 10rem;
    padding: 0;
    text-align: center;
  }

  & select {
    cursor: pointer;
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.medium}) {
    & input,
    & select {
      width: 90%;
    }
  }
`;
