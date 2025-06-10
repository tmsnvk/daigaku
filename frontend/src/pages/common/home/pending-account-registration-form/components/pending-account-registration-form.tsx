/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useGetInstitutionOptions, useGetStudentAndMentorAccountRoles } from '@daigaku/hooks';
import { usePendingAccountRegistrationFormMutation } from '../hooks/use-pending-account-registration-form-mutation.tsx';
import {
  PendingAccountRegistrationFormValidationSchema,
  pendingAccountRegistrationFormValidationSchema,
} from '../schema.ts';

/* component imports */
import {
  CommonInputGroup,
  CommonSelectGroup,
  CoreFormAction,
  CoreFormHeader,
  CoreFormWrapper,
} from '@daigaku/components/form';
import { FormSwapButtons } from '../../common/components/form-swap-buttons.tsx';

/* configuration, utilities, constants imports */
import { removeRolePrefix } from '@daigaku/utilities';
import { formTypeButtonLabel } from '../../common/constants.ts';

/* interface, type imports */
import { CreatePendingAccountPayload, InstitutionOption, RoleOption } from '@daigaku/common-types';
import { FormType, FormTypes } from '../../common/types.ts';

/**
 * Defines the component's properties.
 */
interface PendingAccountRegistrationFormProps {
  /**
   * The method to select the current form type.
   *
   * @param formType The type of the form to be selected.
   */
  onFormSelect: (formType: FormType) => void;
}

/**
 * Renders a registration form component that allows users to submit a form to register a pending account.
 * The component utilizes the `react-hook-form` and `react-query` libraries for managing the form submission.
 * Additionally, users can switch to other forms.
 *
 * @param {PendingAccountRegistrationFormProps} props
 * @return {JSX.Element}
 */
export const PendingAccountRegistrationForm = ({ onFormSelect }: PendingAccountRegistrationFormProps): JSX.Element => {
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

  const formMethods = useForm<PendingAccountRegistrationFormValidationSchema>({
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      institutionUuid: '',
      accountRoleUuid: '',
    },
    resolver: zodResolver(pendingAccountRegistrationFormValidationSchema),
  });
  const { handleSubmit, setError } = formMethods;
  const { mutate: registerPendingAccount, isPending: isSubmitting } =
    usePendingAccountRegistrationFormMutation(setError);
  const submitRegisterPendingAccountForm = (formData: PendingAccountRegistrationFormValidationSchema): void => {
    registerPendingAccount(formData as CreatePendingAccountPayload);
  };

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
            intent={'light'}
          />
          <CommonInputGroup
            id={'lastName'}
            type={'text'}
            isDisabled={isSubmitting}
            label={t('lastNameLabel')}
            placeholder={t('lastNamePlaceholder')}
            intent={'light'}
          />
          <CommonInputGroup
            id={'email'}
            type={'email'}
            isDisabled={isSubmitting}
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            intent={'light'}
          />
          <CommonSelectGroup
            id={'institutionUuid'}
            isLoading={isInstitutionLoading}
            isFetchError={isInstitutionError}
            isDisabled={isSubmitting}
            onRetry={institutionRefetch}
            label={t('institutionLabel')}
            options={
              institutions?.map((institution: InstitutionOption) => (
                <option
                  key={institution.uuid}
                  value={institution.uuid}
                >
                  {institution.name}
                </option>
              )) || []
            }
            initialValue={t('institutionPlaceholder')}
            intent={'light'}
          />
          <CommonSelectGroup
            id={'accountRoleUuid'}
            isLoading={isRoleLoading}
            isFetchError={isRoleError}
            isDisabled={isSubmitting}
            onRetry={roleRefetch}
            label={t('accountRoleLabel')}
            options={
              roles?.map((role: RoleOption) => (
                <option
                  key={role.uuid}
                  value={role.uuid}
                >
                  {removeRolePrefix(role.name)}
                </option>
              )) || []
            }
            initialValue={t('accountRolePlaceholder')}
            intent={'light'}
          />
          <CoreFormAction
            isSubmissionPending={isSubmitting}
            isDisabled={isSubmitDisabled}
            formActionConfig={{
              message: t('pendingAccountRegistrationFormSubmission'),
              value: t('pendingAccountRegistrationFormSubmit'),
            }}
            intent={'dark'}
          />
        </CoreFormWrapper>
      </FormProvider>
      <FormSwapButtons
        isDisabled={isSubmitting}
        onFormSelect={onFormSelect}
        buttonConfig={{
          leftButton: {
            label: formTypeButtonLabel[FormTypes.RESET_ACCOUNT_PASSWORD],
            formType: FormTypes.RESET_ACCOUNT_PASSWORD,
          },
          rightButton: {
            label: formTypeButtonLabel[FormTypes.LOGIN],
            formType: FormTypes.LOGIN,
          },
        }}
      />
    </>
  );
};
