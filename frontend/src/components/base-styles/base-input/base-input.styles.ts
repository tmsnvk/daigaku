/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import styled from 'styled-components';

/**
 * ===============
 * Styled Component {@link BaseInput}
 * ===============
 */

/**
 * @interface
 * @description
 * The interface represents the properties of the {@link BaseInput} styled-component used to define styling or state behaviours such as errors and disabled states.
 *
 * @since 0.0.1
 */
interface BaseInput {
  readonly $isError?: boolean;
  readonly $isDisabled?: boolean;
}

/**
 * @component
 *
 * @since 0.0.1
 */
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
