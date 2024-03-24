import { useForm } from 'react-hook-form';
import { useSubmitForgottenPasswordForm } from './ForgottenPasswordForm.hooks.tsx';
import { FormSwapButton } from '@components/page/home';
import { GenericTextParagraph } from '@components/shared/general';
import {
  ErrorMessage,
  InputFieldStyles,
  InputLabel,
  LoadingIndicator,
  SubmitInput,
} from '@components/shared/form';
import theme from '@theme/theme.ts';
import {
  ConfirmationModalT,
  FormSelectorT,
  FormTypeE,
} from '@pages/shared/Home/Home.types.ts';
import { ForgottenPasswordFormFieldsT } from './ForgottenPasswordForm.types.ts';

type ComponentPropT = FormSelectorT & ConfirmationModalT;

const ForgottenPasswordForm = ({ formSelector, showModal }: ComponentPropT) => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<ForgottenPasswordFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, onSubmit } = useSubmitForgottenPasswordForm({ setError, showModal });

  return (
    <section>
      <GenericTextParagraph
        content={'Request a password reset if you have forgotten your password. Do not request a reset if you have not yet activated your account.'}
        fontSize={theme.fontSize.medium}
      />
      <form id={'userForgottenPasswordForm'} method={'POST'} onSubmit={handleSubmit(onSubmit)}>
        <InputFieldStyles $isError={errors.email?.message !== undefined}>
          <InputLabel inputId={'email'} content={'Email'} />
          <input
            {...register('email', {
              required: { value: true, message: 'Providing your email address is required.' },
            })}
            type={'email'}
            id={'email'}
            name={'email'}
            autoComplete={'off'}
            placeholder={'Enter your email address'}
            disabled={isPending}
          />
          {errors.email?.message && <ErrorMessage error={errors.email.message} />}
        </InputFieldStyles>
        <article>
          {
            isPending ?
              <LoadingIndicator message={'Your registration is being handled.'} /> :
              <SubmitInput type={'submit'} value={'reset'} disabled={isPending} />
          }
          {errors.root?.serverError && <ErrorMessage error={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton formType={FormTypeE.Login} buttonContent={'Log in'} clickHandler={formSelector} />
        <FormSwapButton formType={FormTypeE.Register} buttonContent={'Create account'} clickHandler={formSelector} />
      </article>
    </section>
  );
};

export default ForgottenPasswordForm;
