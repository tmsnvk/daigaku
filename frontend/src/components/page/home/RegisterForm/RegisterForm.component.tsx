import {
  FormContainer,
  FormSwapButton,
} from '@components/page/home';

type ClickHandler = {
  clickHandler: (formType: string) => void;
}

const RegisterForm = ({ clickHandler }: ClickHandler) => {
  return (
    <FormContainer>
      REGISTER PLACEHOLDER
      <article>
        <FormSwapButton formType={'reset'} buttonContent={'Forgot password?'} onClick={clickHandler} />
        <FormSwapButton formType={'login'} buttonContent={'Log in'} onClick={clickHandler} />
      </article>
    </FormContainer>
  );
};

export default RegisterForm;
