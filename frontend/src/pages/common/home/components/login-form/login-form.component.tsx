/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { HandleLoginForm, LoginFormFields, useHandleLoginForm } from './login-form.hooks';

/* component, style imports */
import { GenericInput, InputError, PasswordInput, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { FormSwapButton } from '../form-swap-button';

/* configuration, utilities, constants imports */
import { formTypeButtonLabel } from '../../home.constants';
import { FormInstruction } from '../form-instruction';
import { constants } from './login-form.constants';

/* interface, type, enum imports */
import { FormType, SelectForm, UseFormHook } from '../../home.interfaces';

/**
 * ===============
 * Component {@link LoginForm}
 * ===============
 */

/**
 * Defines the component's properties.
 * A function to handle {@link FormType} switching.
 *
 * @since 0.0.1
 */
type ComponentProps = SelectForm;

/**
 * Renders a login form that allows users to submit their email and password for authentication.
 * The component utilizes the `react-hook-form` library for form handling, including validation, and manages the form submission using the `react-query` library.
 * Additionally, users can switch to other forms, such as {@link ResetForm} or {@link RegistrationForm} using the {@link FormSwapButton} component.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const LoginForm = ({ selectForm }: ComponentProps): JSX.Element => {
  // `react-hook-form` handling hook.
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  }: UseFormHook<LoginFormFields> = useForm<LoginFormFields>({ mode: 'onSubmit' });

  // Custom hook that submits the form.
  const { isPending, mutate }: HandleLoginForm = useHandleLoginForm(setError);

  return (
    <section>
      <FormInstruction instructionText={constants.ui.form.INSTRUCTION} />
      <form
        id={'post-account-login-form'}
        method={'POST'}
        onSubmit={handleSubmit((formData: LoginFormFields) => mutate(formData))}
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
