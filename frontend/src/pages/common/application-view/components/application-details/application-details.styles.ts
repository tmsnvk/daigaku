import styled from 'styled-components';

import { ApplicationFormGrid } from '@components/form';

const ApplicationSection = styled(ApplicationFormGrid)`
  height: fit-content;

  & h1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
  }

  & article:first-of-type {
    grid-column: 1 / 2;
  }

  & article:nth-of-type(2) {
    grid-column: 2 / 3;

    & a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 5rem;
      padding: 0 2.5rem 0 2.5rem;
      color: ${({ theme }) => theme.color.primaryLight};
      background-color: ${({ theme }) => theme.color.primaryDark};
      font-size: ${({ theme }) => theme.fontSize.large};
      letter-spacing: 0.3rem;
      text-transform: uppercase;
      border: 0.3rem solid ${({ theme }) => theme.color.primaryDark};
      border-radius: 1rem;
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) => theme.color.secondaryDark};
        color: ${({ theme }) => theme.color.primaryLight};
        box-shadow: 0 0 0.5rem ${({ theme }) => theme.color.secondaryDark};
      }
    }
  }

  & article {
    grid-column: 1 / 3;
    grid-row: auto;
    min-width: fit-content;
  }

  @media screen and (width < ${({ theme }) => theme.breakpoint.large}) {
    width: 85%;
  }
`;

export {
  ApplicationSection,
};
