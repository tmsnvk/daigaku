import styled from 'styled-components';

const FormGridContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 2.5rem;
  row-gap: 5rem;
  width: 95%;
  margin: 5% auto 5% auto;
  padding: 5rem 5rem 10rem 5rem;
  justify-items: center;
  align-items: center;
  border: 0.1rem solid ${({ theme }) => theme.color.secondaryLight};
  border-radius: 1.25rem;
  box-shadow: 0.25rem 0.25rem 1rem ${({ theme }) => theme.color.primaryDark};

  & h1,
  & article:first-of-type,
  & article:last-of-type {
    grid-column: 1 / 3;
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.large}) {
    width: 75%;
  }

  @media screen and (width > ${({ theme }) => theme.breakpoint.xLarge}) {
    width: 55%;
  }
`;

export {
  FormGridContainer,
};
