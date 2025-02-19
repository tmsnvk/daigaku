/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import styled from 'styled-components';

export const Button = styled.button`
  height: 5rem;
  padding: 0 1.5rem 0 1.5rem;
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: 800;
  color: ${({ theme }) => theme.color.secondaryDark};
  background-color: ${({ theme }) => theme.color.secondaryLight};
  border-radius: 0.75rem;
  cursor: pointer;

  &:focus,
  &:hover {
    outline: 0.25rem solid ${({ theme }) => theme.color.secondaryDark};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
