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
import { LoginFormFields, HandleLoginForm, useHandleLoginForm } from './login-form.hooks';

/* component, style imports */
import { LoadingIndicator } from '@components/general';
import { GenericInputField, InputError, PasswordInputField, SubmitInput } from '@components/form';
import { FormSwapButton } from '../form-swap-button/index';

/* configuration, utilities, constants imports */
import { FormInstructionText } from '../form-instruction-text/index';
import * as constants from './login-form.contants.json';
import { formTypeContent } from '../../home.utilities';

/**
 * ===============
 * Component {@link LoginForm}
 * ===============
 */

/* interface, type, enum imports */
import { FormSelector, FormType } from '../../home.types';

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
  const { isPending, mutate }: HandleLoginForm = useHandleLoginForm({ setError });

  return (
    <section>
      <FormInstructionText content={constants.uiMessages.FORM_INSTRUCTION} />
      <form
        id={'post-account-login-form'}
        method={'POST'}
        onSubmit={handleSubmit((formData) => mutate(formData))}
      >
        <GenericInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.REQUIRED_EMAIL,
            },
          }}
          fieldError={errors.email?.message}
          fieldId={'email'}
          label={constants.form.EMAIL_LABEL}
          type={'email'}
          placeholder={constants.form.EMAIL_PLACEHOLDER}
          isDisabled={isPending}
        />
        <PasswordInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.REQUIRED_PASSWORD,
            },
          }}
          fieldError={errors.password?.message}
          fieldId={'password'}
          labelContent={constants.form.PASSWORD_LABEL}
          placeholder={constants.form.PASSWORD_PLACEHOLDER}
          isDisabled={isPending}
        />
        <article>
          {isPending ? (
            <LoadingIndicator message={constants.uiMessages.LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              name={'login'}
              value={constants.form.SUBMIT}
              disabled={isPending}
            />
          )}
          {errors.root && <InputError message={errors?.root?.message} />}
        </article>
      </form>
      <article>
        <FormSwapButton
          formType={FormType.RESET}
          content={formTypeContent.RESET}
          clickHandler={formSelector}
          isDisabled={isPending}
        />
        <FormSwapButton
          formType={FormType.REGISTER}
          content={formTypeContent.REGISTER}
          clickHandler={formSelector}
          isDisabled={isPending}
        />
      </article>
    </section>
  );
};
