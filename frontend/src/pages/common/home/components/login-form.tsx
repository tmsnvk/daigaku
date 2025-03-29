/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

/* logic imports */
import { useLoginFormMutation } from '../hooks';

/* component imports */
import { CommonInputGroup, CoreFormAction, PasswordInputGroup } from '@components/form';
import { FormHeader } from './form-header';
import { FormSwapButtons } from './form-swap-buttons';
import { FormWrapper } from './form-wrapper';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';
import { formTypeButtonLabel } from '../constants';

/* interface, type, enum imports */
import { CoreInputElementStyleIntent, CoreSubmitInputElementStyleIntent, LoginRequest } from '@common-types';
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
 * Renders a login form component allowing users to submit their email and password for authentication.
 * The component is integrated with the `react-hook-form` and `react-query` libraries for managing submission.
 * Additionally, users can switch to other forms.
 *
 * @param {LoginFormProps} props
 * @return {JSX.Element}
 */
export const LoginForm = ({ onFormSelect }: LoginFormProps): JSX.Element => {
  const methods = useForm<LoginRequest>({ mode: 'onSubmit' });
  const {
    formState: { errors },
    handleSubmit,
    setError,
  } = methods;
  const { isPending, mutate } = useLoginFormMutation(setError);

  return (
    <>
      <FormHeader headerContent={l.PAGES.COMMON.HOME.LOGIN.FORM.HEADER} />
      <FormProvider {...methods}>
        <FormWrapper
          formId={'post-account-login-form'}
          onFormSubmitHandler={handleSubmit((formData: LoginRequest) => mutate(formData))}
        >
          <CommonInputGroup
            validationRules={{
              required: {
                value: true,
                message: l.PAGES.COMMON.HOME.LOGIN.FORM.EMAIL.VALIDATION.REQUIRED,
              },
            }}
            id={'email'}
            type={'email'}
            label={l.PAGES.COMMON.HOME.LOGIN.FORM.EMAIL.LABEL}
            placeholder={l.PAGES.COMMON.HOME.LOGIN.FORM.EMAIL.PLACEHOLDER}
            isDisabled={isPending}
            error={errors.email?.message}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <PasswordInputGroup
            validationRules={{
              required: {
                value: true,
                message: l.PAGES.COMMON.HOME.LOGIN.FORM.PASSWORD.VALIDATION.REQUIRED,
              },
            }}
            id={'password'}
            label={l.PAGES.COMMON.HOME.LOGIN.FORM.PASSWORD.LABEL}
            placeholder={l.PAGES.COMMON.HOME.LOGIN.FORM.PASSWORD.PLACEHOLDER}
            isDisabled={isPending}
            error={errors.password?.message}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CoreFormAction
            isSubmissionPending={isPending}
            submissionMessage={l.PAGES.COMMON.HOME.LOGIN.MESSAGES.PAGE_LOADING}
            submitId={'login'}
            submissionValue={l.PAGES.COMMON.HOME.LOGIN.FORM.SUBMIT}
            errorMessage={errors.root?.message}
            intent={CoreSubmitInputElementStyleIntent.DARK}
          />
        </FormWrapper>
      </FormProvider>
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
