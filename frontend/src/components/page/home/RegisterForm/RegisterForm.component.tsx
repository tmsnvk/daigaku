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
      <form id={'userRegistrationForm'} method={'POST'} onSubmit={handleSubmit(onSubmit)}>
        <InputFieldStyles $isError={errors.firstName?.message !== undefined}>
          <label htmlFor={'firstName'}>First name</label>
          <input
            {...register('firstName', {
              required: { value: true, message: 'Providing your first name is required.' },
              pattern: { value: /^[A-Za-z-\s]+$/i, message: 'Use only letters.' },
            })}
            type={'firstName'}
            id={'firstName'}
            name={'firstName'}
            autoComplete={'off'}
            placeholder={'Enter your first name'}
            disabled={isSubmitting}
          />
          {errors.firstName?.message && <ErrorMessage error={errors.firstName.message} />}
        </InputFieldStyles>
        <InputFieldStyles $isError={errors.lastName?.message !== undefined}>
          <label htmlFor={'lastName'}>Last name</label>
          <input
            {...register('lastName', {
              required: { value: true, message: 'Providing your last name is required.' },
              pattern: { value: /^[A-Za-z-\s]+$/i, message: 'Use only letters.' },
            })}
            type={'lastName'}
            id={'lastName'}
            name={'lastName'}
            autoComplete={'off'}
            placeholder={'Enter your last name'}
            disabled={isSubmitting}
          />
          {errors.lastName?.message && <ErrorMessage error={errors.lastName.message} />}
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
