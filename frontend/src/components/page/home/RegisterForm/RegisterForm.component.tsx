import {
  FormContainer,
  FormSwapButton,
} from '@components/page/home';
import {
  ClickHandlerT,
  FormTypeT,
} from '@pages/Home/Home.types.ts';

const RegisterForm = ({ clickHandler }: ClickHandlerT) => {
  return (
    <FormContainer>
      REGISTER PLACEHOLDER
      <article>
        <FormSwapButton formType={FormTypeT.Reset} buttonContent={'Forgot password?'} clickHandler={clickHandler} />
        <FormSwapButton formType={FormTypeT.Login} buttonContent={'Log in'} clickHandler={clickHandler} />
      </article>
    </FormContainer>
  );
};

export default RegisterForm;
