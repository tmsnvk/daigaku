import styled from 'styled-components';

const BoxContainer = styled.dl`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem 2.5rem 1rem;
  width: 15rem;
  height: 15rem;
  text-align: center;
  background-color: ${({ theme }) => theme.color.secondaryLight};
  border: 0.25rem solid ${({ theme }) => theme.color.secondaryLight};
  border-radius: 0.75rem;
  box-shadow: 0 0.1rem 1.5rem 0 ${({ theme }) => theme.color.primaryDark};
  
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

export {
  BoxContainer,
};
