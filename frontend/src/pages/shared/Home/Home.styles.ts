import styled from 'styled-components';

const MainContainer = styled.main`
  container-type: inline-size;
  container-name: main;
  display: flex;
  flex-direction: column;
  align-items: center;

  & section {
    margin: 5% 0 5% 0;
    width: 85%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5rem 2.5rem 5rem 2.5rem;
    text-align: center;
    border: 0.25rem solid ${({ theme }) => theme.color.secondaryLight};
    border-radius: 0.75rem;
    box-shadow: 1rem 1rem 1.5rem 0 ${({ theme }) => theme.color.secondaryLight};

    & > article {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 10rem 0 0 0;
    }

    & form {
      display: flex;
      flex-direction: column;
      align-items: center;

      & article {
        text-align: center;
      }

      & article:last-of-type {
        height: 5rem;
      }
    }
  }

  @container main (width > ${({ theme }) => theme.breakpoint.small}) {
    & section {
      width: 50rem;
    }
  }
`;

export {
  MainContainer,
};
