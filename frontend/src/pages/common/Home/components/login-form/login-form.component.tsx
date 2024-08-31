/**
 * @prettier
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import { LoginFormFields, SubmitLoginForm, useSubmitLoginForm } from './login-form.hooks';

/* component, style imports */
import { LoadingIndicator } from '@components/general';
import { GenericInputField, InputError, PasswordInputField, SubmitInput } from '@components/form';
import { FormSwapButton } from '../form-swap-button/index';

/* utilities imports */
import { FormInstructionText } from '../form-instruction-text/index';

/* interface, type, enum imports */
import { FormSelector, FormType } from '../../hhome.types';

/* interfaces, types, enums */
type ComponentProps = FormSelector;

/*
 * component - TODO - add functionality description
 */
export const LoginForm = ({ formSelector }: ComponentProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginFormFields>({ mode: 'onSubmit' });
  const { isPending, mutate }: SubmitLoginForm = useSubmitLoginForm({ setError });

  return (
    <section>
      <FormInstructionText content={'Sign in if you already have an admin-approved account, otherwise, apply for one first.'} />
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
          {isPending ? (
            <LoadingIndicator message={'You are being logged in.'} />
          ) : (
            <SubmitInput
              type={'submit'}
              name={'login'}
              value={'sign in'}
              disabled={isPending}
            />
          )}
          {errors.root?.serverError && <InputError message={errors.root.serverError.message as string} />}
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
