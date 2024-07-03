import styled from 'styled-components';
import BaseInput from '../BaseInput';

const BasePasswordInputField = styled(BaseInput)`
  & input {
    width: 65%;
  }

  & div {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.large};
    color: ${({ theme }) => theme.color.primaryDark};

    & svg {
      width: 2.5rem;
      margin: 0 0 0 1rem;
    }
  }
`;

export default BasePasswordInputField;
