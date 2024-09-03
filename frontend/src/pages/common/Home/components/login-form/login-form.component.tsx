/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import { HandleLoginForm, LoginFormFields, useHandleLoginForm } from './login-form.hooks';

/* component, style imports */
import { GenericInputField, InputError, PasswordInputField, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { FormSwapButton } from '../form-swap-button/index';

/* configuration, utilities, constants imports */
import { formTypeButtonLabel } from '../../home.utilities';
import { FormInstruction } from '../form-instruction/index';
import { constants } from './login-form.constants';

/* interface, type, enum imports */
import { FormType, SelectForm, UseFormHook } from '../../home.types';

/**
 * ===============
 * Component {@link LoginForm}
 * ===============
 */

/* interfaces, types, enums */
type ComponentProps = SelectForm;

/**
 * @description
 * - The {@link LoginForm} component is responsible for rendering a login form that allows users to submit their email and password for authentication.
 * - The component utilizes the `react-hook-form` library for form handling, including validation, and manages the form submission using the `react-query` library.
 * - Additionally, users can switch to other forms, such as {@link ResetForm} or {@link RegistrationForm} using the {@link FormSwapButton} components.
 *
 * @param {Function} props.selectForm - A function that handles {@link FormType} switching.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const LoginForm = ({ selectForm }: ComponentProps): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  }: UseFormHook<LoginFormFields> = useForm<LoginFormFields>({ mode: 'onSubmit' });
  const { isPending, mutate }: HandleLoginForm = useHandleLoginForm({ setError });

  return (
    <section>
      <FormInstruction content={constants.uiMessage.FORM_INSTRUCTION} />
      <form
        id={'post-account-login-form'}
        method={'POST'}
        onSubmit={handleSubmit((formData: LoginFormFields) => mutate(formData))}
      >
        <GenericInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.REQUIRED_EMAIL,
            },
          }}
          type={'email'}
          id={'email'}
          label={constants.form.EMAIL_LABEL}
          placeholder={constants.form.EMAIL_PLACEHOLDER}
          isDisabled={isPending}
          error={errors.email?.message}
        />
        <PasswordInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.REQUIRED_PASSWORD,
            },
          }}
          id={'password'}
          label={constants.form.PASSWORD_LABEL}
          placeholder={constants.form.PASSWORD_PLACEHOLDER}
          isDisabled={isPending}
          error={errors.password?.message}
        />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={constants.uiMessage.LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              id={'login'}
              name={'login'}
              value={constants.form.SUBMIT}
              disabled={isPending}
            />
          )}
          {errors.root && <InputError errorText={errors.root.message} />}
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
