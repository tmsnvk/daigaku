/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useResetFormMutation } from '../hooks';

/* component imports */
import { CommonInputGroup, CoreFormAction, CoreFormHeader, CoreFormWrapper } from '@daigaku/components/form';
import { FormSwapButtons } from './form-swap-buttons';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';
import { formTypeButtonLabel } from '../constants';

/* interface, type, enum imports */
import {
  AccountResetPayload,
  CoreInputElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
} from '@daigaku/common-types';
import { FormType } from '../models';

const formValidationSchema = z.object({
  email: z.string().email({ message: TranslationKey.EMAIL_REQUIRED }),
});

type FormInputValues = z.infer<typeof formValidationSchema>;

const initialFormValues: FormInputValues = {
  email: '',
};

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

  /**
   * The method to display a modal component.
   */
  showModal: () => void;
}

/**
 * Renders a password reset form component that allows users to reset their account access.
 * The component utilizes the `react-hook-form` and `react-query` libraries for managing the form submission.
 * Additionally, users can switch to other forms.
 *
 * @param {ResetAccountPasswordFormProps} props
 * @return {JSX.Element}
 */
export const ResetAccountPasswordForm = ({ onFormSelect, showModal }: ResetAccountPasswordFormProps): JSX.Element => {
  const { t } = useTranslation();

  const formMethods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: initialFormValues,
    resolver: zodResolver(formValidationSchema),
  });
  const { handleSubmit, setError } = formMethods;
  const { mutate: resetAccountPassword, isPending: isSubmitting } = useResetFormMutation(setError, showModal);
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
