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
import { useResetAccountPasswordForm } from '../hooks/use-reset-account-password-form.tsx';
import { ResetAccountPasswordSchema, resetAccountPasswordSchema } from '../schema.ts';

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
interface ResetAccountPasswordFormProps {
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
 * @param {ResetAccountPasswordFormProps} props
 * @return {JSX.Element}
 */
export const ResetAccountPasswordForm = ({ onFormSelect }: ResetAccountPasswordFormProps): JSX.Element => {
  const { t } = useTranslation();

  const formMethods = useForm<ResetAccountPasswordSchema>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: standardSchemaResolver(resetAccountPasswordSchema),
  });

  const { handleSubmit, setError } = formMethods;

  const { mutate: resetAccountPassword, isPending: isSubmitting } = useResetAccountPasswordForm(setError);

  const onFormSubmit = handleSubmit((formData: ResetAccountPasswordSchema) => {
    resetAccountPassword(formData as PasswordResetPayload);
  });

  return (
    <>
      <CoreFormHeader
        title={t('resetPasswordFormHeader')}
        intent={'small'}
      />
      <FormProvider {...formMethods}>
        <CoreFormWrapper
          formId={'post-account-reset-form'}
          onFormSubmit={onFormSubmit}
        >
          <CommonInputGroup
            id={'email'}
            type={'email'}
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            isDisabled={isSubmitting}
            intent={'light'}
          />
          <CoreFormAction
            isSubmissionPending={isSubmitting}
            formActionConfig={{
              message: t('resetPasswordFormSubmission'),
              value: t('resetPasswordFormSubmit'),
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
