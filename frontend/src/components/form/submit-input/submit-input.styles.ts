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

export const SubmitInput = styled.input`
  height: 5rem;
  padding: 0 2.5rem 0 2.5rem;
  text-align: center;
  color: ${({ theme }) => theme.color.primaryLight};
  font-size: ${({ theme }) => theme.fontSize.large};
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.color.primaryDark};
  border: 0.3rem solid ${({ theme }) => theme.color.primaryDark};
  border-radius: ${({ theme }) => theme.options.borderRadius};
  cursor: pointer;

  &:hover:not([disabled]) {
    background-color: ${({ theme }) => theme.color.secondaryDark};
    color: ${({ theme }) => theme.color.primaryLight};
    box-shadow: 0 0 0.5rem ${({ theme }) => theme.color.secondaryDark};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: 0.15rem solid ${({ theme }) => theme.color.secondaryDark};
  }
`;
