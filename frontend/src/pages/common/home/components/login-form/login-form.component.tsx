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

/* component imports */
import { GenericInput, InputError, PasswordInput, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { FormHeader } from '../form-header';
import { FormSwapButtons } from '../form-swap-buttons';

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
   * The method to select the current form type.
   *
   * @param formType The type of the form to be selected.
   */
  onFormSelect: (formType: FormType) => void;
}

/**
 * Renders a login form component that allows users to submit their email and password for authentication.
 * The component utilizes the `react-hook-form` and `react-query` libraries for managing the form submission.
 * Additionally, users can switch to other forms.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const LoginForm = ({ onFormSelect }: ComponentProps): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginRequest>({ mode: 'onSubmit' });
  const { isPending, mutate } = useHandleLoginForm(setError);

  return (
    <>
      <FormHeader headerContent={l.PAGES.COMMON.HOME.LOGIN.FORM.HEADER} />
      <form
        id={'post-account-login-form'}
        className={'flex flex-col items-center'}
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
      <FormSwapButtons
        leftButtonLabel={formTypeButtonLabel[FormType.RESET]}
        leftButtonFormType={FormType.RESET}
        rightButtonLabel={formTypeButtonLabel[FormType.REGISTER]}
        rightButtonFormType={FormType.REGISTER}
        onFormSelect={onFormSelect}
        isDisabled={isPending}
      />
    </>
  );
};
