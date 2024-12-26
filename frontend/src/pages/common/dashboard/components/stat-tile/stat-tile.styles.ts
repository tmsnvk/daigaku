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

/* component, style imports */
import { BaseDarkBorder } from '@components/base-styles';

export const DescriptionList = styled.dl`
  ${BaseDarkBorder};

  width: 15rem;
  height: 15rem;
  padding: 0 1rem 2.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  & dt {
    padding: 0 0 1.5rem 0;
    font-size: ${({ theme }) => theme.fontSize.xLarge};
  }

  & dd {
    font-size: ${({ theme }) => theme.fontSize.small};
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.small}) {
    justify-content: space-evenly;
    min-width: 20rem;
    min-height: 20rem;

    & dt {
      font-size: ${({ theme }) => theme.fontSize.xxLarge};
      padding: 0;
    }

    & dd {
      font-size: ${({ theme }) => theme.fontSize.medium};
    }
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.medium}) {
    width: 25rem;
    height: 25rem;

    & dt {
      font-size: ${({ theme }) => theme.fontSize.xxxLarge};
      padding: 0;
    }
  }
`;
