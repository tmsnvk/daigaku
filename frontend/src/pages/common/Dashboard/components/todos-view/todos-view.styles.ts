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

/* component, style imports */
import { BaseLightBorder } from '@components/base-styles';

/**
 * ===============
 * Styled Component {@link Section}
 * ===============
 */

/**
 * @since 0.0.1
 */
export const Section = styled.section`
  ${BaseLightBorder};

  width: 95%;
  margin: 0 auto 5rem auto;
  padding: 1rem 3.5rem 1rem 3.5rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  background-color: ${({ theme }) => theme.color.tertiaryLight};

  & ul {
    & li:first-of-type {
      margin: 2rem 0 1.5rem 0;
    }

    & li {
      margin: 0 0 1.5rem 0;
    }

    & li:last-of-type {
      margin: 0 0 2rem 0;
    }
  }

  & ol {
    margin: 0 0 0 2.5rem;

    & li:first-of-type {
      margin: 2rem 0 1.5rem 0;
    }

    & li {
      margin: 0 0 1.5rem 0;
      list-style-type: square;
    }

    & li:last-of-type {
      margin: 0 0 2rem 0;
    }
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.small}) {
    font-size: ${({ theme }) => theme.fontSize.medium};

    & ol {
      margin: 0 0 0 7.5rem;
    }
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.large}) {
    width: 65%;
  }
`;
