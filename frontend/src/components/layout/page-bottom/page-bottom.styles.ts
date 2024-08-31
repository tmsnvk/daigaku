/**
 * @prettier
 */

/* external imports */
import styled from 'styled-components';

export const Footer = styled.footer`
  height: 7.5rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.secondaryLight};
  box-shadow: 0 0.1rem 1.5rem 0 ${({ theme }) => theme.color.primaryDark};

  & p {
    font-size: ${({ theme }) => theme.fontSize.small};
  }
`;
