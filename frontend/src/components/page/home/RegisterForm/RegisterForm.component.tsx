import {
  FormContainer,
  FormSwapButton,
} from '@components/page/home';
import {
  ClickHandler,
  FormType,
} from '@pages/Home/Home.types.ts';

const RegisterForm = ({ clickHandler }: ClickHandler) => {
  return (
    <FormContainer>
      REGISTER PLACEHOLDER
      <article>
        <FormSwapButton formType={FormType.Reset} buttonContent={'Forgot password?'} onClick={clickHandler} />
        <FormSwapButton formType={FormType.Login} buttonContent={'Log in'} onClick={clickHandler} />
      </article>
    </FormContainer>
  );
};

export default RegisterForm;
