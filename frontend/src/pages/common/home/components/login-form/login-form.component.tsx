/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useHandleLoginForm } from './login-form.hooks';

/* component, style imports */
import { GenericInput, InputError, PasswordInput, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { FormInstruction } from '../form-instruction';
import { FormSwapButton } from '../form-swap-button';

/* configuration, utilities, constants imports */
import { formTypeButtonLabel } from '../../home.constants';
import { constants } from './login-form.constants';

/* interface, type, enum imports */
import { LoginRequest } from '@common-types';
import { FormType, SelectForm, UseFormHook } from '../../home.models';
import { HandleLoginForm } from './login-form.models';

/**
 * Defines the component's properties.
 */
type ComponentProps = SelectForm;

/**
 * Renders a login form that allows users to submit their email and password for authentication.
 * The component utilizes the `react-hook-form` library for form handling,
 * including validation, and manages the form submission using the `react-query` library.
 * Additionally, users can switch to other forms, such as {@link ResetForm} or {@link RegistrationForm}
 * using the {@link FormSwapButton} component.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const LoginForm = ({ selectForm }: ComponentProps): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  }: UseFormHook<LoginRequest> = useForm<LoginRequest>({ mode: 'onSubmit' });
  const { isPending, mutate }: HandleLoginForm = useHandleLoginForm(setError);

  return (
    <section>
      <FormInstruction instructionText={constants.ui.form.INSTRUCTION} />
      <form
        id={'post-account-login-form'}
        method={'POST'}
        onSubmit={handleSubmit((formData: LoginRequest) => mutate(formData))}
      >
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.REQUIRED_EMAIL,
            },
          }}
          type={'email'}
          id={'email'}
          label={constants.ui.form.EMAIL_LABEL}
          placeholder={constants.ui.form.EMAIL_PLACEHOLDER}
          isDisabled={isPending}
          error={errors.email?.message}
        />
        <PasswordInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.REQUIRED_PASSWORD,
            },
          }}
          id={'password'}
          label={constants.ui.form.PASSWORD_LABEL}
          placeholder={constants.ui.form.PASSWORD_PLACEHOLDER}
          isDisabled={isPending}
          error={errors.password?.message}
        />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={constants.ui.messages.LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              id={'login'}
              name={'login'}
              value={constants.ui.form.SUBMIT}
              disabled={isPending}
            />
          )}
          {errors.root && <InputError message={errors.root.message} />}
        </article>
      </form>
      <article>
        <FormSwapButton
          formType={FormType.RESET}
          buttonLabel={formTypeButtonLabel[FormType.RESET]}
          onFormSelect={selectForm}
          isDisabled={isPending}
        />
        <FormSwapButton
          formType={FormType.REGISTER}
          buttonLabel={formTypeButtonLabel[FormType.REGISTER]}
          onFormSelect={selectForm}
          isDisabled={isPending}
        />
      </article>
    </section>
  );
};
