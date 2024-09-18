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
 * Styled Component {@link Form}
 * ===============
 */

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
