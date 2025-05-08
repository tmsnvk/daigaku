/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
import { TranslationKey } from '@daigaku/constants';
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
    .nonempty({ message: TranslationKey.FIRST_NAME_REQUIRED })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      message: TranslationKey.NAME_PATTERN,
    }),
  lastName: z
    .string()
    .trim()
    .nonempty({ message: TranslationKey.LAST_NAME_REQUIRED })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      message: TranslationKey.NAME_PATTERN,
    }),
  email: z.string().email({ message: TranslationKey.EMAIL_REQUIRED }),
  institutionUuid: z.string().uuid({ message: TranslationKey.INSTITUTION_REQUIRED }),
  accountRoleUuid: z.string().uuid({ message: TranslationKey.ACCOUNT_ROLE_REQUIRED }),
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
}

/**
 * Renders a registration form component that allows users to submit a form to register a pending account.
 * The component utilises the `react-hook-form` and `react-query` libraries for managing the form submission.
 * Additionally, users can switch to other forms.
 *
 * @param {RegisterPendingAccountFormProps} props
 * @return {JSX.Element}
 */
export const RegisterPendingAccountForm = ({ onFormSelect }: RegisterPendingAccountFormProps): JSX.Element => {
  const { t } = useTranslation();

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
  const { mutate: registerPendingAccount, isPending: isSubmitting } = useRegistrationFormMutation(setError);
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
        title={t('pendingAccountRegisterFormHeader')}
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
            label={t('firstNameLabel')}
            placeholder={t('firstNamePlaceholder')}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CommonInputGroup
            id={'lastName'}
            type={'text'}
            isDisabled={isSubmitting}
            label={t('lastNameLabel')}
            placeholder={t('lastNamePlaceholder')}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CommonInputGroup
            id={'email'}
            type={'email'}
            isDisabled={isSubmitting}
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CommonSelectGroup
            id={'institutionUuid'}
            isLoading={isInstitutionLoading}
            isError={isInstitutionError}
            isDisabled={isSubmitting}
            onRetry={institutionRefetch}
            label={t('institutionLabel')}
            options={institutionOptions}
            initialValue={t('institutionPlaceholder')}
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CommonSelectGroup
            id={'accountRoleUuid'}
            isLoading={isRoleLoading}
            isError={isRoleError}
            isDisabled={isSubmitting}
            onRetry={roleRefetch}
            label={t('accountRoleLabel')}
            options={roleOptions}
            initialValue={t('accountRolePlaceholder')}
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormAction
            isSubmissionPending={isSubmitting}
            isDisabled={isSubmitDisabled}
            formActionConfig={{
              message: t('pendingAccountRegistrationFormSubmission'),
              value: t('pendingAccountRegistrationFormSubmit'),
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
