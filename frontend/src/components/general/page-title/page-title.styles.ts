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

export const TitleHeading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xLarge};

  &::after {
    content: '';
    display: block;
    width: 66%;
    margin: 2.5rem auto 2.5rem auto;
    border-bottom: 0.5rem solid ${({ theme }) => theme.color.primaryDark};
  }
`;
