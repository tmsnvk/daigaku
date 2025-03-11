/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useLoginFormMutation } from '../hooks';

/* component imports */
import { GenericInput, PasswordInput } from '@components/form';
import { FormAction } from './form-action';
import { FormHeader } from './form-header';
import { FormSwapButtons } from './form-swap-buttons';
import { FormWrapper } from './form-wrapper';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';
import { formTypeButtonLabel } from '../constants';

/* interface, type, enum imports */
import { LoginRequest } from '@common-types';
import { FormType } from '../models';

/**
 * Defines the component's properties.
 */
interface LoginFormProps {
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
 * @param {LoginFormProps} props
 * @return {JSX.Element}
 */
export const LoginForm = ({ onFormSelect }: LoginFormProps): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginRequest>({ mode: 'onSubmit' });
  const { isPending, mutate } = useLoginFormMutation(setError);

  return (
    <>
      <FormHeader headerContent={l.PAGES.COMMON.HOME.LOGIN.FORM.HEADER} />
      <FormWrapper
        formId={'post-account-login-form'}
        submissionHandler={handleSubmit((formData: LoginRequest) => mutate(formData))}
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
        <FormAction
          isSubmissionPending={isPending}
          submissionMessage={l.PAGES.COMMON.HOME.LOGIN.MESSAGES.PAGE_LOADING}
          submissionId={'login'}
          submissionValue={l.PAGES.COMMON.HOME.LOGIN.FORM.SUBMIT}
          errorMessage={errors.root?.message}
        />
      </FormWrapper>
      <FormSwapButtons
        leftButtonLabel={formTypeButtonLabel[FormType.RESET]}
        leftButtonFormType={FormType.RESET}
        rightButtonLabel={formTypeButtonLabel[FormType.REGISTER]}
        rightButtonFormType={FormType.REGISTER}
        isDisabled={isPending}
        onFormSelect={onFormSelect}
      />
    </>
  );
};
