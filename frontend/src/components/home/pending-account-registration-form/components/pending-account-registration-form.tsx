/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useGetInstitutionOptions } from '@daigaku/hooks';
import { removeRolePrefix } from '@daigaku/utilities';
import { useGetPendingAccountRegistrationRoles } from '../hooks/use-get-pending-account-registration-roles.tsx';
import { usePendingAccountRegistrationForm } from '../hooks/use-pending-account-registration-form.tsx';
import { PendingAccountRegistrationSchema, pendingAccountRegistrationSchema } from '../schema.ts';

/* component imports */
import {
  FormHeader,
  FormWrapper,
  InputGroup,
  SelectGroupWithFetch,
  SubmitInputGroup,
} from '@daigaku/components/common/form';
import { FormSwapButtons } from '../../common/components/form-swap-buttons.tsx';

/* configuration, constants imports */
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
    isLoading: isInstitutionsLoading,
    isError: isInstitutionsError,
    refetch: institutionRefetch,
  } = useGetInstitutionOptions();

  const {
    data: roles,
    isLoading: isRolesLoading,
    isError: isRolesError,
    refetch: roleRefetch,
  } = useGetPendingAccountRegistrationRoles();

  const formMethods = useForm<PendingAccountRegistrationSchema>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      institutionUuid: '',
      accountRoleUuid: '',
    },
    mode: 'onSubmit',
    resolver: standardSchemaResolver(pendingAccountRegistrationSchema),
  });
  const { handleSubmit, setError, reset: resetForm } = formMethods;

  const { mutate: registerPendingAccount, isPending: isSubmitting } = usePendingAccountRegistrationForm(
    setError,
    resetForm,
  );

  const onFormSubmit = handleSubmit((formData: PendingAccountRegistrationSchema): void => {
    registerPendingAccount(formData as CreatePendingAccountPayload);
  });

  return (
    <>
      <FormHeader
        intent={'small'}
        title={t('app.page.root.pendingAccountRegistration.form.header')}
      />
      <FormProvider {...formMethods}>
        <FormWrapper
          formId={'pending-account-registration-form'}
          onFormSubmit={onFormSubmit}
        >
          <InputGroup
            disabled={isSubmitting}
            id={'firstName'}
            intent={'light'}
            label={t('app.page.root.pendingAccountRegistration.form.firstNameLabel')}
            placeholder={t('app.page.root.pendingAccountRegistration.form.firstNamePlaceholder')}
            type={'text'}
          />
          <InputGroup
            disabled={isSubmitting}
            id={'lastName'}
            intent={'light'}
            label={t('app.page.root.pendingAccountRegistration.form.lastNameLabel')}
            placeholder={t('app.page.root.pendingAccountRegistration.form.lastNamePlaceholder')}
            type={'text'}
          />
          <InputGroup
            disabled={isSubmitting}
            id={'email'}
            intent={'light'}
            label={t('app.page.root.pendingAccountRegistration.form.emailLabel')}
            placeholder={t('app.page.root.pendingAccountRegistration.form.emailPlaceholder')}
            type={'email'}
          />
          <SelectGroupWithFetch
            defaultValue={t('app.page.root.pendingAccountRegistration.form.institutionPlaceholder')}
            disabled={isSubmitting}
            id={'institutionUuid'}
            intent={'light'}
            isFetchError={isInstitutionsError}
            isLoading={isInstitutionsLoading}
            label={t('app.page.root.pendingAccountRegistration.form.institutionLabel')}
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
            onRetry={institutionRefetch}
          />
          <SelectGroupWithFetch
            defaultValue={t('app.page.root.pendingAccountRegistration.form.accountRolePlaceholder')}
            disabled={isSubmitting}
            id={'accountRoleUuid'}
            intent={'light'}
            isFetchError={isRolesError}
            isLoading={isRolesLoading}
            label={t('app.page.root.pendingAccountRegistration.form.accountRoleLabel')}
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
            onRetry={roleRefetch}
          />
          <SubmitInputGroup
            formActionConfig={{
              message: t('app.page.root.pendingAccountRegistration.form.loadingText'),
              value: t('app.page.root.pendingAccountRegistration.form.submitButton'),
            }}
            intent={'dark'}
            isSubmissionPending={isSubmitting}
          />
        </FormWrapper>
      </FormProvider>
      <FormSwapButtons
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
        disabled={isSubmitting}
        onFormSelect={onFormSelect}
      />
    </>
  );
};
