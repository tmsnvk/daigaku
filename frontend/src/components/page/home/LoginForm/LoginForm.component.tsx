import { GenericTextParagraph } from '@components/shared/general';
import {
  GenericInputField,
  PasswordInputField,
} from '@components/shared/form';
import {
  emailFieldPlaceholder,
  introductionParagraph,
  passwordFieldPlaceholder,
} from './LoginForm.utilities.ts';

const LoginForm = () => {
  return (
    <section>
      <GenericTextParagraph text={introductionParagraph} />
      <GenericInputField
        id={'email'}
        labelContent={'Email'}
        type={'email'}
        placeholder={emailFieldPlaceholder}
      />
      <PasswordInputField
        id={'password'}
        labelContent={'Password'}
        placeholder={passwordFieldPlaceholder}
      />
    </section>
  );
};

export default LoginForm;
