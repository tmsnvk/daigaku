import { useForm } from 'react-hook-form';

import {
  LoginFormFields,
  useSubmitLoginForm,
} from './login-form.hooks';

import { LoadingIndicator } from '@components/general';
import {
  InputError,
  SubmitInput,
} from '@components/form';
import {
  GenericInputField,
  PasswordInputField,
} from '@components/input-implementations';
import FormSwapButton from '../form-swap-button/index';
import FormInstructionText from '../form-instruction-text/index';

import {
  FormSelector,
  FormType,
} from '../../home.types';

type ComponentProps = FormSelector;

const LoginForm = ({ formSelector }: ComponentProps) => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<LoginFormFields>({ mode: 'onSubmit' });
  const { isPending, mutate } = useSubmitLoginForm({ setError });

  return (
    <section>
      <FormInstructionText
        content={'Sign in if you already have an admin-approved account, otherwise, apply for one first.'}
      />
      <form
        id={'postAccountLoginForm'}
        method={'POST'}
        onSubmit={handleSubmit((formData) => mutate(formData))}
      >
        <GenericInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: 'Providing your email address is required.',
            },
          }}
          fieldError={errors.email?.message}
          fieldId={'email'}
          label={'Email'}
          type={'email'}
          placeholder={'Enter your email address'}
          isDisabled={isPending}
        />
        <PasswordInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: 'Providing your password is required.',
            },
          }}
          fieldError={errors.password?.message}
          fieldId={'password'}
          labelContent={'Password'}
          placeholder={'Enter your password'}
          isDisabled={isPending}
        />
        <article>
          {
            isPending ?
              <LoadingIndicator content={'You are being logged in.'} /> :
              <SubmitInput type={'submit'} name={'login'} value={'sign in'} disabled={isPending} />
          }
          {errors.root?.serverError && <InputError content={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton
          formType={FormType.RESET}
          content={'Forgot password?'}
          clickHandler={formSelector}
          isDisabled={isPending}
        />
        <FormSwapButton
          formType={FormType.REGISTER}
          content={'Create account'}
          clickHandler={formSelector}
          isDisabled={isPending}
        />
      </article>
    </section>
  );
};

export default LoginForm;
