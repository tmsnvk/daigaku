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
import { useSubmitRegisterForm } from './RegisterForm.hooks.tsx';
import {
  ClickHandlerT,
  FormTypeT,
} from '@pages/Home/Home.types.ts';
import { RegisterFormFieldsT } from './RegisterForm.types.ts';

const RegisterForm = ({ clickHandler }: ClickHandlerT) => {
  const { formState: { isLoading, isSubmitting, errors }, handleSubmit, register, setError } = useForm<RegisterFormFieldsT>({ mode: 'onSubmit' });
  const { onSubmit } = useSubmitRegisterForm(setError);

  return (
    <FormContainer>
      <GenericTextParagraph text={'Register an account if you are not in our system yet.'} />
      <form id={'userRegisterForm'} method={'POST'} onSubmit={handleSubmit(onSubmit)}>
        <InputFieldStyles $isError={errors.fullName?.message !== undefined}>
          <label htmlFor={'fullName'}>Full name</label>
          <input
            {...register('fullName', {
              required: { value: true, message: 'Providing your name is required.' },
              pattern: { value: /^[A-Za-z-\s]+$/i, message: 'Use only letters.' },
            })}
            type={'fullName'}
            id={'fullName'}
            name={'fullName'}
            autoComplete={'off'}
            placeholder={'Enter your name'}
            disabled={isSubmitting}
          />
          {errors.fullName?.message && <ErrorMessage error={errors.fullName.message} />}
        </InputFieldStyles>
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
            <SubmitInput type={'submit'} value={'register'} disabled={isSubmitting || isLoading} />
          }
          {errors.root?.serverError && <ErrorMessage error={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton formType={FormTypeT.Reset} buttonContent={'Forgot password?'} clickHandler={clickHandler} />
        <FormSwapButton formType={FormTypeT.Login} buttonContent={'Log in'} clickHandler={clickHandler} />
      </article>
    </FormContainer>
  );
};

export default RegisterForm;
