import styled from 'styled-components';
import { InputFieldContainer } from '@components/shared/form';

const PasswordInputFieldContainer = styled(InputFieldContainer)`
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 0 2rem;

    & div {
      width: 1rem;
      margin: 0 0 0 1rem;
      font-size: ${(props) => props.theme.fontSize.large};
      color: ${(props) => props.theme.color.primaryDark};
    }
  }
`;

export {
  PasswordInputFieldContainer,
};
