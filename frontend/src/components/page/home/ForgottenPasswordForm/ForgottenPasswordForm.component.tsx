import {
  FormContainer,
  FormSwapButton,
} from '@components/page/home';
import {
  ClickHandlerT,
  FormTypeT,
} from '@pages/Home/Home.types.ts';

const ForgottenPasswordForm = ({ clickHandler }: ClickHandlerT) => {
  return (
    <FormContainer>
      PW RESET PLACEHOLDER
      <article>
        <FormSwapButton formType={FormTypeT.Login} buttonContent={'Log in'} clickHandler={clickHandler} />
        <FormSwapButton formType={FormTypeT.Register} buttonContent={'Create account'} clickHandler={clickHandler} />
      </article>
    </FormContainer>
  );
};

export default ForgottenPasswordForm;
