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
 * Styled Component {@link Article}
 * ===============
 */

/**
 * The interface represents the properties of the {@link Article} styled-component.
 *
 * @since 0.0.1
 */
interface Article {
  readonly $isRemovable: boolean;
}

/**
 * @since 0.0.1
 */
export const Article = styled.article<Article>`
  & button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 5rem;
    padding: 0 2.5rem 0 2.5rem;
    color: ${({ theme }) => theme.color.primaryLight};
    font-size: ${({ theme }) => theme.fontSize.large};
    letter-spacing: 0.3rem;
    text-transform: uppercase;
    background-color: ${({ theme, $isRemovable }) => ($isRemovable ? theme.color.error : theme.color.primaryDark)};
    border: 0.3rem solid ${({ theme }) => theme.color.primaryDark};
    border-radius: 1rem;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme, $isRemovable }) => ($isRemovable ? theme.color.error : theme.color.secondaryDark)};
      color: ${({ theme }) => theme.color.primaryLight};
      box-shadow: 0 0 0.5rem ${({ theme }) => theme.color.secondaryDark};
    }
  }
`;
