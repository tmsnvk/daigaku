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
import { useAccountPasswordResetForm } from '../hooks/use-account-password-reset-form.tsx';
import { AccountPasswordResetSchema, accountPasswordResetSchema } from '../schema.ts';

/* component imports */
import { CommonInputGroup, CoreFormAction, CoreFormHeader, CoreFormWrapper } from '@daigaku/components/common/form';
import { FormSwapButtons } from '../../common/components/form-swap-buttons.tsx';

/* configuration, constants imports */
import { formTypeButtonLabel } from '../../common/constants.ts';

/* interface, type imports */
import { PasswordResetPayload } from '@daigaku/common-types';
import { FormType, FormTypes } from '../../common/types.ts';

/**
 * Defines the component's properties.
 */
interface AccountPasswordResetFormProps {
  /**
   * The method to select the current form type.
   *
   * @param formType The type of the form to be selected.
   */
  onFormSelect: (formType: FormType) => void;
}

/**
 * Renders a password reset form component that allows users to reset their account access.
 * The component utilizes the `react-hook-form` and `react-query` libraries for managing the form submission.
 * Additionally, users can switch to other forms.
 *
 * @param {AccountPasswordResetFormProps} props
 * @return {JSX.Element}
 */
export const AccountPasswordResetForm = ({ onFormSelect }: AccountPasswordResetFormProps): JSX.Element => {
  const { t } = useTranslation();

  const formMethods = useForm<AccountPasswordResetSchema>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: standardSchemaResolver(accountPasswordResetSchema),
  });

  const { handleSubmit, setError } = formMethods;

  const { mutate: resetAccountPassword, isPending: isSubmitting } = useAccountPasswordResetForm(setError);

  const onFormSubmit = handleSubmit((formData: AccountPasswordResetSchema) => {
    resetAccountPassword(formData as PasswordResetPayload);
  });

  return (
    <>
      <CoreFormHeader
        title={t('app.page.root.passwordReset.form.header')}
        intent={'small'}
      />
      <FormProvider {...formMethods}>
        <CoreFormWrapper
          formId={'account-reset-form'}
          onFormSubmit={onFormSubmit}
        >
          <CommonInputGroup
            id={'email'}
            type={'email'}
            label={t('app.page.root.passwordReset.form.emailLabel')}
            placeholder={t('app.page.root.passwordReset.form.emailPlaceholder')}
            isDisabled={isSubmitting}
            intent={'light'}
          />
          <CoreFormAction
            isSubmissionPending={isSubmitting}
            formActionConfig={{
              message: t('app.page.root.passwordReset.form.loadingText'),
              value: t('app.page.root.passwordReset.form.submitButton'),
            }}
            intent={'dark'}
          />
        </CoreFormWrapper>
      </FormProvider>
      <FormSwapButtons
        buttonConfig={{
          leftButton: {
            label: formTypeButtonLabel[FormTypes.LOGIN],
            formType: FormTypes.LOGIN,
          },
          rightButton: {
            label: formTypeButtonLabel[FormTypes.REGISTER_PENDING_ACCOUNT],
            formType: FormTypes.REGISTER_PENDING_ACCOUNT,
          },
        }}
        isDisabled={isSubmitting}
        onFormSelect={onFormSelect}
      />
    </>
  );
};
