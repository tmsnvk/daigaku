import { GenericTextParagraph } from '@components/shared/general';
import { InputField } from '@components/shared/form';
import {
  emailFieldPlaceholder,
  introductionParagraph,
  passwordFieldPlaceholder,
} from './LoginForm.utilities.ts';

const LoginForm = () => {
  return (
    <>
      <GenericTextParagraph text={introductionParagraph} />
      <InputField
        id={'email'}
        labelContent={'Email'}
        type={'email'}
        placeholder={emailFieldPlaceholder}
      />
      <InputField
        id={'password'}
        labelContent={'Password'}
        type={'password'}
        placeholder={passwordFieldPlaceholder}
      />
    </>
  );
};

export default LoginForm;
