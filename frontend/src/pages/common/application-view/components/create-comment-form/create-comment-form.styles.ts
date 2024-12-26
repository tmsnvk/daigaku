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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & textarea {
    padding: 2rem 1.5rem 2rem 1.5rem;
    background-color: ${({ theme }) => theme.color.secondaryLight};
    border: 0.2rem solid ${({ theme }) => theme.color.primaryDark};
    border-radius: 1.25rem;
    box-shadow: 0 0 0.5rem 0 ${({ theme }) => theme.color.primaryDark};

    &:hover,
    &:focus {
      border: 0.2rem solid ${({ theme }) => theme.color.tertiaryLight};
    }
  }
`;
