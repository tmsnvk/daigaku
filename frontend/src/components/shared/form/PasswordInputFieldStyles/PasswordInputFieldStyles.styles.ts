import styled from 'styled-components';
import { InputFieldStyles } from '@components/shared/form';

const PasswordInputFieldStyles = styled(InputFieldStyles)`
  & input {
    width: 31.5rem;
  }
  
  & div {
    font-size: ${(props) => props.theme.fontSize.large};
    color: ${(props) => props.theme.color.primaryDark};
    
    & svg {
      width: 2.5rem;
      margin: 0 0 0 1rem;
    }
  }
`;

export default PasswordInputFieldStyles;
