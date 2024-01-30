import {
  FormContainer,
  FormSwapButton,
} from '@components/page/home';
import { GenericTextParagraph } from '@components/shared/general';
import {
  GenericInputField,
  PasswordInputField,
} from '@components/shared/form';

type ClickHandler = {
  clickHandler: (formType: string) => void;
}

const LoginForm = ({ clickHandler }: ClickHandler) => {
  return (
    <FormContainer>
      <GenericTextParagraph text={'Sign in if you already have an admin-approved profile, otherwise, fill in the Registration form.'} />
      <GenericInputField
        id={'email'}
        labelContent={'Email'}
        type={'email'}
        placeholder={'Enter your email address...'}
      />
      <PasswordInputField
        id={'password'}
        labelContent={'Password'}
        placeholder={'Enter your password...'}
      />
      <article>
        <FormSwapButton formType={'reset'} buttonContent={'Forgot password?'} onClick={clickHandler} />
        <FormSwapButton formType={'register'} buttonContent={'Create account'} onClick={clickHandler} />
      </article>
    </FormContainer>
  );
};

export default LoginForm;
