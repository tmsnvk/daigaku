import {
  FormContainer,
  FormSwapButton,
} from '@components/page/home';
import { GenericTextParagraph } from '@components/shared/general';
import {
  GenericInputField,
  PasswordInputField,
} from '@components/shared/form';
import {
  ClickHandler,
  FormType,
} from '@pages/Home/Home.types.ts';

const LoginForm = ({ clickHandler }: ClickHandler) => {
  return (
    <FormContainer>
      <GenericTextParagraph text={'Sign in if you already have an admin-approved profile, otherwise, create an account first.'} />
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
        <FormSwapButton formType={FormType.Reset} buttonContent={'Forgot password?'} onClick={clickHandler} />
        <FormSwapButton formType={FormType.Register} buttonContent={'Create account'} onClick={clickHandler} />
      </article>
    </FormContainer>
  );
};

export default LoginForm;
