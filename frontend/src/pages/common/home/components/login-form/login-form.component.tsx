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
import { localization as l } from '@constants';
import { formTypeButtonLabel } from '../../home.constants';

/* interface, type, enum imports */
import { LoginRequest } from '@common-types';
import { FormType } from '../../home.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * A function to select the current form type.
   *
   * @param formType The type of the form to be selected.
   */
  selectForm: (formType: FormType) => void;
}

/**
 * Renders a login form component that allows users to submit their email and password for authentication.
 * The component utilizes the `react-hook-form` and `react-query` libraries for managing the form submission.
 * Additionally, users can switch to other forms on the page using the {@link FormSwapButton} component.
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
  } = useForm<LoginRequest>({ mode: 'onSubmit' });
  const { isPending, mutate } = useHandleLoginForm(setError);

  return (
    <section>
      <FormInstruction instructionText={l.PAGES.COMMON.HOME.LOGIN.FORM.INSTRUCTION} />
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
              message: l.PAGES.COMMON.HOME.LOGIN.FORM.EMAIL.VALIDATION.REQUIRED,
            },
          }}
          type={'email'}
          id={'email'}
          label={l.PAGES.COMMON.HOME.LOGIN.FORM.EMAIL.LABEL}
          placeholder={l.PAGES.COMMON.HOME.LOGIN.FORM.EMAIL.PLACEHOLDER}
          isDisabled={isPending}
          error={errors.email?.message}
        />
        <PasswordInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: l.PAGES.COMMON.HOME.LOGIN.FORM.PASSWORD.VALIDATION.REQUIRED,
            },
          }}
          id={'password'}
          label={l.PAGES.COMMON.HOME.LOGIN.FORM.PASSWORD.LABEL}
          placeholder={l.PAGES.COMMON.HOME.LOGIN.FORM.PASSWORD.VALIDATION.REQUIRED}
          isDisabled={isPending}
          error={errors.password?.message}
        />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={l.PAGES.COMMON.HOME.LOGIN.MESSAGES.PAGE_LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              id={'login'}
              name={'login'}
              value={l.PAGES.COMMON.HOME.LOGIN.FORM.SUBMIT}
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
