import { useForm } from 'react-hook-form';
import {
  FormContainer,
  FormSwapButton,
} from '@components/page/home';
import { GenericTextParagraph } from '@components/shared/general';
import {
  ErrorMessage,
  InputFieldStyles,
  LoadingIndicator,
  SubmitInput,
} from '@components/shared/form';
import { useSubmitForgottenPasswordForm } from './ForgottenPasswordForm.hooks.tsx';
import {
  FormComponentPropT,
  FormTypeE,
} from '@pages/Home/Home.types.ts';
import { ForgottenPasswordFormFieldsT } from './ForgottenPasswordForm.types.ts';

const ForgottenPasswordForm = ({ formSelector, showModal }: FormComponentPropT) => {
  const { formState: { isLoading, isSubmitting, errors }, handleSubmit, register, setError } = useForm<ForgottenPasswordFormFieldsT>({ mode: 'onSubmit' });
  const { onSubmit } = useSubmitForgottenPasswordForm({ setError, showModal });

  return (
    <FormContainer>
      <GenericTextParagraph text={'Request a password reset if you have forgotten your password. Do not request a reset if you have not yet activated your account.'} />
      <form id={'userForgottenPasswordForm'} method={'POST'} onSubmit={handleSubmit(onSubmit)}>
        <InputFieldStyles $isError={errors.email?.message !== undefined}>
          <label htmlFor={'email'}>Email</label>
          <input
            {...register('email', {
              required: { value: true, message: 'Providing your email address is required.' },
            })}
            type={'email'}
            id={'email'}
            name={'email'}
            autoComplete={'off'}
            placeholder={'Enter your email address'}
            disabled={isSubmitting}
          />
          {errors.email?.message && <ErrorMessage error={errors.email.message} />}
        </InputFieldStyles>
        <article>
          {isSubmitting ?
            <LoadingIndicator message={'Your registration is being handled.'} /> :
            <SubmitInput type={'submit'} value={'reset'} disabled={isSubmitting || isLoading} />
          }
          {errors.root?.serverError && <ErrorMessage error={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton formType={FormTypeE.Login} buttonContent={'Log in'} clickHandler={formSelector} />
        <FormSwapButton formType={FormTypeE.Register} buttonContent={'Create account'} clickHandler={formSelector} />
      </article>
    </FormContainer>
  );
};

export default ForgottenPasswordForm;
