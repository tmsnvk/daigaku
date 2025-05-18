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
import { useResetAccountPasswordFormMutation } from '../hooks/use-reset-account-password-form-mutation.tsx';

/* component imports */
import { CommonInputGroup, CoreFormAction, CoreFormHeader, CoreFormWrapper } from '@daigaku/components/form';
import { FormSwapButtons } from '../../common/components/form-swap-buttons.tsx';

/* configuration, utilities, constants imports */
import { formTypeButtonLabel } from '../../common/constants.ts';

/* interface, type, enum, schema imports */
import {
  AccountResetPayload,
  CoreInputElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
} from '@daigaku/common-types';
import { FormType } from '../../common/types.ts';
import { FormInputValues, formValidationSchema } from '../schema.ts';

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

  const formMethods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(formValidationSchema),
  });
  const { handleSubmit, setError } = formMethods;
  const { mutate: resetAccountPassword, isPending: isSubmitting } = useResetAccountPasswordFormMutation(setError);
  const submitResetAccountPasswordForm = (formData: FormInputValues): void => {
    resetAccountPassword(formData as AccountResetPayload);
  };

  return (
    <>
      <CoreFormHeader
        title={t('resetPasswordFormHeader')}
        intent={'small'}
      />
      <FormProvider {...formMethods}>
        <CoreFormWrapper
          formId={'post-account-reset-form'}
          onFormSubmit={handleSubmit(submitResetAccountPasswordForm)}
        >
          <CommonInputGroup
            id={'email'}
            type={'email'}
            isDisabled={isSubmitting}
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CoreFormAction
            isSubmissionPending={isSubmitting}
            formActionConfig={{
              message: t('resetPasswordFormSubmission'),
              value: t('resetPasswordFormSubmit'),
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
            label: formTypeButtonLabel[FormType.LOGIN],
            formType: FormType.LOGIN,
          },
          rightButton: {
            label: formTypeButtonLabel[FormType.REGISTER_PENDING_ACCOUNT],
            formType: FormType.REGISTER_PENDING_ACCOUNT,
          },
        }}
      />
    </>
  );
};
