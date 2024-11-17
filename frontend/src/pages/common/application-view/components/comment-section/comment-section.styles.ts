/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import styled from 'styled-components';

/**
 * ===============
 * Styled Component {@link Section}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const Section = styled.section`
  margin: 10rem 2.5rem 5rem 0;

  & > div {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto 5rem auto;

    & span {
      font-size: ${({ theme }) => theme.fontSize.large};
    }
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    width: 65%;
    margin: 5rem auto 5rem auto;
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.small}) {
    width: 95%;
    margin: 5rem auto 5rem auto;
  }
`;
