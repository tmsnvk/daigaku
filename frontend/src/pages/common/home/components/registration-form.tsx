/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

/* logic imports */
import { useGetInstitutionOptions, useGetStudentAndMentorAccountRoles } from '@hooks';
import { useRegistrationFormMutation } from '../hooks';

/* component imports */
import {
  AccountRoleSelectGroup,
  CommonInputGroup,
  CoreFormAction,
  CoreFormHeader,
  CoreFormWrapper,
  InstitutionSelectGroup,
} from '@components/form';
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { FormSwapButtons } from './form-swap-buttons';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';
import { formTypeButtonLabel } from '../constants';

/* interface, type, enum imports */
import {
  CoreInputElementStyleIntent,
  CoreSelectElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
  PendingAccountRegistrationRequest,
} from '@common-types';
import { FormType } from '../models';

/**
 * Defines the component's properties.
 */
interface RegistrationFormProps {
  /**
   * The method to select the current form type.
   *
   * @param formType The type of the form to be selected.
   */
  onFormSelect: (formType: FormType) => void;

  /**
   * The method to display a modal component.
   */
  showModal: () => void;
}

/**
 * Renders a registration form component that allows users to submit a form to register a pending account.
 * The component utilizes the `react-hook-form` and `react-query` libraries for managing the form submission.
 * Additionally, users can switch to other forms.
 *
 * @param {RegistrationFormProps} props
 * @return {JSX.Element}
 */
export const RegistrationForm = ({ onFormSelect, showModal }: RegistrationFormProps): JSX.Element => {
  const { data: institutions, isLoading: isInstitutionLoading, isError: isInstitutionError } = useGetInstitutionOptions();
  const { data: roles, isLoading: isRoleLoading, isError: isRoleError } = useGetStudentAndMentorAccountRoles();
  const methods = useForm<PendingAccountRegistrationRequest>({ mode: 'onSubmit' });
  const {
    formState: { errors },
    handleSubmit,
    setError,
  } = methods;
  const { isPending, mutate } = useRegistrationFormMutation(setError, showModal);

  if (isInstitutionLoading || isRoleLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isInstitutionLoading || isRoleLoading}
        loadingText={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.MESSAGES.PAGE_LOADING}
      />
    );
  }

  if (isInstitutionError || isRoleError) {
    return (
      <GlobalErrorModal
        isVisible={isInstitutionError || isRoleError}
        onCloseModal={() => onFormSelect(FormType.LOGIN)}
      />
    );
  }

  return (
    <>
      <CoreFormHeader
        title={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.HEADER}
        intent={'small'}
      />
      <FormProvider {...methods}>
        <CoreFormWrapper
          formId={'post-pending-account-registration-form'}
          onFormSubmit={handleSubmit((formData: PendingAccountRegistrationRequest) => {
            mutate(formData);
          })}
        >
          <CommonInputGroup
            validationRules={{
              required: {
                value: true,
                message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.VALIDATION.REQUIRED,
              },
              pattern: {
                value: /^[\p{L}\s-]{2,100}$/u,
                message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.VALIDATION.PATTERN,
              },
            }}
            type={'text'}
            id={'firstName'}
            label={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.LABEL}
            placeholder={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.PLACEHOLDER}
            isDisabled={isPending}
            error={errors.firstName?.message}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CommonInputGroup
            validationRules={{
              required: {
                value: true,
                message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.VALIDATION.REQUIRED,
              },
              pattern: {
                value: /^[\p{L}\s-]{2,100}$/u,
                message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.VALIDATION.PATTERN,
              },
            }}
            type={'text'}
            id={'lastName'}
            label={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.LABEL}
            placeholder={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.PLACEHOLDER}
            isDisabled={isPending}
            error={errors.lastName?.message}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CommonInputGroup
            validationRules={{
              required: {
                value: true,
                message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.EMAIL.VALIDATION.REQUIRED,
              },
            }}
            type={'email'}
            id={'email'}
            label={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.EMAIL.LABEL}
            placeholder={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.EMAIL.PLACEHOLDER}
            isDisabled={isPending}
            error={errors.email?.message}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <InstitutionSelectGroup
            validationRules={{
              required: {
                value: true,
                message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.INSTITUTION.VALIDATION.REQUIRED,
              },
            }}
            id={'institutionUuid'}
            options={institutions ?? []}
            isDisabled={isPending}
            error={errors.institutionUuid?.message}
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <AccountRoleSelectGroup
            validationRules={{
              required: {
                value: true,
                message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.ACCOUNT_ROLE.VALIDATION.REQUIRED,
              },
            }}
            id={'accountRoleUuid'}
            options={roles ?? []}
            isDisabled={isPending}
            error={errors.accountRoleUuid?.message}
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormAction
            isSubmissionPending={isPending}
            submissionMessage={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.MESSAGES.FORM_LOADING}
            submitId={'register'}
            submissionValue={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.SUBMIT}
            errorMessage={errors.root?.message}
            submitButtonStyleIntent={CoreSubmitInputElementStyleIntent.DARK}
          />
        </CoreFormWrapper>
      </FormProvider>
      <FormSwapButtons
        leftButtonLabel={formTypeButtonLabel[FormType.RESET]}
        leftButtonFormType={FormType.RESET}
        rightButtonLabel={formTypeButtonLabel[FormType.LOGIN]}
        rightButtonFormType={FormType.LOGIN}
        isDisabled={isPending}
        onFormSelect={onFormSelect}
      />
    </>
  );
};
