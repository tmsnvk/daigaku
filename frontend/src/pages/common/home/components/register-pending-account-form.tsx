/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

/* logic imports */
import { useGetInstitutionOptions, useGetStudentAndMentorAccountRoles } from '@daigaku/hooks';
import { useRegistrationFormMutation } from '../hooks';

/* component imports */
import {
  CommonInputGroup,
  CommonSelectGroup,
  CoreFormAction,
  CoreFormHeader,
  CoreFormWrapper,
} from '@daigaku/components/form';
import { FormSwapButtons } from './form-swap-buttons';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';
import { removeRolePrefix } from '@daigaku/utilities';
import { formTypeButtonLabel } from '../constants';

/* interface, type, enum imports */
import {
  CoreInputElementStyleIntent,
  CoreSelectElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
  InstitutionOption,
  PendingAccountRegistrationPayload,
  RoleOption,
} from '@daigaku/common-types';
import { FormType } from '../models';

const formValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty({ message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.VALIDATION.REQUIRED })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.VALIDATION.PATTERN,
    }),
  lastName: z
    .string()
    .trim()
    .nonempty({ message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.VALIDATION.REQUIRED })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.VALIDATION.PATTERN,
    }),
  email: z.string().email({ message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.EMAIL.VALIDATION.REQUIRED }),
  institutionUuid: z
    .string()
    .uuid({ message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.INSTITUTION.VALIDATION.REQUIRED }),
  accountRoleUuid: z
    .string()
    .uuid({ message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.ACCOUNT_ROLE.VALIDATION.REQUIRED }),
});

type FormInputValues = z.infer<typeof formValidationSchema>;

const initialFormValues: FormInputValues = {
  firstName: '',
  lastName: '',
  email: '',
  institutionUuid: '',
  accountRoleUuid: '',
};

/**
 * Defines the component's properties.
 */
interface RegisterPendingAccountFormProps {
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
 * The component utilises the `react-hook-form` and `react-query` libraries for managing the form submission.
 * Additionally, users can switch to other forms.
 *
 * @param {RegisterPendingAccountFormProps} props
 * @return {JSX.Element}
 */
export const RegisterPendingAccountForm = ({
  onFormSelect,
  showModal,
}: RegisterPendingAccountFormProps): JSX.Element => {
  const {
    data: institutions,
    isLoading: isInstitutionLoading,
    isError: isInstitutionError,
    refetch: institutionRefetch,
  } = useGetInstitutionOptions();
  const {
    data: roles,
    isLoading: isRoleLoading,
    isError: isRoleError,
    refetch: roleRefetch,
  } = useGetStudentAndMentorAccountRoles();
  const isSubmitDisabled = isInstitutionLoading || isRoleLoading || isInstitutionError || isRoleError;

  const formMethods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: initialFormValues,
    resolver: zodResolver(formValidationSchema),
  });
  const { handleSubmit, setError } = formMethods;

  const { mutate: registerPendingAccount, isPending: isSubmitting } = useRegistrationFormMutation(setError, showModal);

  const submitRegisterPendingAccountForm = (formData: FormInputValues): void => {
    registerPendingAccount(formData as PendingAccountRegistrationPayload);
  };

  const institutionOptions = useMemo(
    () =>
      institutions?.map((institution: InstitutionOption) => (
        <option
          key={institution.uuid}
          value={institution.uuid}
        >
          {institution.name}
        </option>
      )) || [],
    [institutions],
  );

  const roleOptions = useMemo(
    () =>
      roles?.map((role: RoleOption) => (
        <option
          key={role.uuid}
          value={role.uuid}
        >
          {removeRolePrefix(role.name)}
        </option>
      )) || [],
    [roles],
  );

  return (
    <>
      <CoreFormHeader
        title={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.HEADER}
        intent={'small'}
      />
      <FormProvider {...formMethods}>
        <CoreFormWrapper
          formId={'post-pending-account-registration-form'}
          onFormSubmit={handleSubmit(submitRegisterPendingAccountForm)}
        >
          <CommonInputGroup
            id={'firstName'}
            type={'text'}
            isDisabled={isSubmitting}
            label={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.LABEL}
            placeholder={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.PLACEHOLDER}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CommonInputGroup
            id={'lastName'}
            type={'text'}
            isDisabled={isSubmitting}
            label={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.LABEL}
            placeholder={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.PLACEHOLDER}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CommonInputGroup
            id={'email'}
            type={'email'}
            isDisabled={isSubmitting}
            label={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.EMAIL.LABEL}
            placeholder={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.EMAIL.PLACEHOLDER}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CommonSelectGroup
            id={'institutionUuid'}
            isLoading={isInstitutionLoading}
            isError={isInstitutionError}
            isDisabled={isSubmitting}
            onRetry={institutionRefetch}
            label={l.COMPONENTS.FORM.INSTITUTION_DROPDOWN.LABEL}
            options={institutionOptions}
            initialValue={l.COMPONENTS.FORM.INSTITUTION_DROPDOWN.DEFAULT_OPTION}
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CommonSelectGroup
            id={'accountRoleUuid'}
            isLoading={isRoleLoading}
            isError={isRoleError}
            isDisabled={isSubmitting}
            onRetry={roleRefetch}
            label={l.COMPONENTS.FORM.ACCOUNT_ROLE_DROPDOWN.LABEL}
            options={roleOptions}
            initialValue={l.COMPONENTS.FORM.ACCOUNT_ROLE_DROPDOWN.DEFAULT_OPTION}
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormAction
            isSubmissionPending={isSubmitting}
            isDisabled={isSubmitDisabled}
            formActionConfig={{
              message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.MESSAGES.FORM_LOADING,
              value: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.SUBMIT,
            }}
            intent={CoreSubmitInputElementStyleIntent.DARK}
          />
        </CoreFormWrapper>
      </FormProvider>
      <FormSwapButtons
        isDisabled={isSubmitting}
        onFormSelect={onFormSelect}
        buttonConfig={{
          leftButton: {
            label: formTypeButtonLabel[FormType.RESET_ACCOUNT_PASSWORD],
            formType: FormType.RESET_ACCOUNT_PASSWORD,
          },
          rightButton: {
            label: formTypeButtonLabel[FormType.LOGIN],
            formType: FormType.LOGIN,
          },
        }}
      />
    </>
  );
};
