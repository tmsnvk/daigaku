import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormContainer,
  FormSwapButton,
} from '@components/page/home';
import { GenericTextParagraph } from '@components/shared/general';
import {
  ErrorMessage,
  InputFieldStyles,
  LoadingIndicator,
  PasswordInputFieldStyles,
  SubmitInput,
} from '@components/shared/form';
import { useRevealPasswordInInputField } from '@hooks';
import { useSubmitLoginForm } from './LoginForm.hooks.tsx';
import { iconLibraryConfig } from '@configuration';
import {
  ClickHandlerT,
  FormTypeT,
} from '@pages/Home/Home.types.ts';
import { LoginFormFieldsT } from './LoginForm.types.ts';

const LoginForm = ({ clickHandler }: ClickHandlerT) => {
  const { isRevealed, handleRevealClick } = useRevealPasswordInInputField();
  const { formState: { isLoading, isSubmitting, errors }, handleSubmit, register, setError } = useForm<LoginFormFieldsT>({ mode: 'onSubmit' });
  const { onSubmit } = useSubmitLoginForm(setError);

  return (
    <FormContainer>
      <GenericTextParagraph text={'Sign in if you already have an admin-approved profile, otherwise, apply for an account first.'} />
      <form id={'userLoginForm'} method={'POST'} onSubmit={handleSubmit(onSubmit)}>
        <InputFieldStyles
          $isError={errors.email?.message !== undefined}
        >
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
          {errors.email?.message && <ErrorMessage errorMessage={errors.email.message} />}
        </InputFieldStyles>
        <PasswordInputFieldStyles
          $isError={errors.password?.message !== undefined}
        >
          <label htmlFor={'password'}>Password</label>
          <div>
            <input
              {...register('password', {
                required: { value: true, message: 'Providing your password is required.' },
              })}
              type={isRevealed ? 'text' : 'password'}
              id={'password'}
              name={'password'}
              autoComplete={'off'}
              placeholder={'Enter your password'}
              disabled={isSubmitting}
            />
            <FontAwesomeIcon
              onClick={handleRevealClick}
              icon={isRevealed ? iconLibraryConfig.faEyeSlash : iconLibraryConfig.faEye}
            />
          </div>
          {errors.password?.message && <ErrorMessage errorMessage={errors.password.message} />}
        </PasswordInputFieldStyles>
        <article>
          {isSubmitting ?
            <LoadingIndicator message={'You are being logged in.'} /> :
            <SubmitInput type={'submit'} value={'sign in'} disabled={isSubmitting || isLoading} />
          }
          {errors.root?.serverError && <ErrorMessage errorMessage={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton formType={FormTypeT.Reset} buttonContent={'Forgot password?'} clickHandler={clickHandler} isDisabled={isSubmitting} />
        <FormSwapButton formType={FormTypeT.Register} buttonContent={'Create account'} clickHandler={clickHandler} isDisabled={isSubmitting} />
      </article>
    </FormContainer>
  );
};

export default LoginForm;
