import styled from 'styled-components';

const ListContainer = styled.section`
  width: 95%;
  margin: 0 auto 5rem auto;
  padding: 1rem 3.5rem 1rem 3.5rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  background-color: ${({ theme }) => theme.color.tertiaryLight};
  border: 0.1rem solid ${({ theme }) => theme.color.secondaryLight};
  border-radius: 0.75rem;
  box-shadow: 0.25rem 0.25rem 1rem ${({ theme }) => theme.color.primaryDark};

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

export {
  ListContainer,
};
