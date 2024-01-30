import {
  FormContainer,
  FormSwapButton,
} from '@components/page/home';
import {
  ClickHandler,
  FormType,
} from '@pages/Home/Home.types.ts';

const ForgottenPasswordForm = ({ clickHandler }: ClickHandler) => {
  return (
    <FormContainer>
      PW RESET PLACEHOLDER
      <article>
        <FormSwapButton formType={FormType.Login} buttonContent={'Log in'} onClick={clickHandler} />
        <FormSwapButton formType={FormType.Register} buttonContent={'Create account'} onClick={clickHandler} />
      </article>
    </FormContainer>
  );
};

export default ForgottenPasswordForm;
