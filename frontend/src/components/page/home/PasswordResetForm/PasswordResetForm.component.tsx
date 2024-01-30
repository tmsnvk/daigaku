import {
  FormContainer,
  FormSwapButton,
} from '@components/page/home';

type ClickHandler = {
  clickHandler: (formType: string) => void;
}

const PasswordResetForm = ({ clickHandler }: ClickHandler) => {
  return (
    <FormContainer>
      PW RESET PLACEHOLDER
      <article>
        <FormSwapButton formType={'login'} buttonContent={'Log in'} onClick={clickHandler} />
        <FormSwapButton formType={'register'} buttonContent={'Create account'} onClick={clickHandler} />
      </article>
    </FormContainer>
  );
};

export default PasswordResetForm;
