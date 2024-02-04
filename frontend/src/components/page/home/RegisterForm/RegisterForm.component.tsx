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
  ConfirmationModalT,
  FormSelectorT,
  FormTypeE,
} from '@pages/Home/Home.types.ts';
import { RegisterFormFieldsT } from './RegisterForm.types.ts';

type FormComponentPropT = FormSelectorT & ConfirmationModalT;

const RegisterForm = ({ formSelector, showModal }: FormComponentPropT) => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<RegisterFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, onSubmit } = useSubmitRegisterForm({ setError, showModal });

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
            disabled={isPending}
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
            disabled={isPending}
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
            disabled={isPending}
          />
          {errors.email?.message && <ErrorMessage error={errors.email.message} />}
        </InputFieldStyles>
        <article>
          {isPending ?
            <LoadingIndicator message={'Your registration is being handled.'} /> :
            <SubmitInput type={'submit'} value={'register'} disabled={isPending} />
          }
          {errors.root?.serverError && <ErrorMessage error={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton formType={FormTypeE.Reset} buttonContent={'Forgot password?'} clickHandler={formSelector} />
        <FormSwapButton formType={FormTypeE.Login} buttonContent={'Log in'} clickHandler={formSelector} />
      </article>
    </FormContainer>
  );
};

export default RegisterForm;
