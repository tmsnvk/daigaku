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
import { z } from 'zod';

/* logic imports */
import { useLoginFormMutation } from '../hooks';

/* component imports */
import {
  CommonInputGroup,
  CoreFormAction,
  CoreFormHeader,
  CoreFormWrapper,
  PasswordInputGroup,
} from '@daigaku/components/form';
import { FormSwapButtons } from './form-swap-buttons';

/* configuration, utilities, constants imports */
import { TranslationKey } from '@daigaku/constants';
import { formTypeButtonLabel } from '../constants';

/* interface, type, enum imports */
import { CoreInputElementStyleIntent, CoreSubmitInputElementStyleIntent, LoginPayload } from '@daigaku/common-types';
import { FormType } from '../models';

const formValidationSchema = z.object({
  email: z.string().email({ message: TranslationKey.EMAIL_REQUIRED }),
  password: z.string().trim().nonempty({ message: TranslationKey.PASSWORD_REQUIRED }),
});

type FormInputValues = z.infer<typeof formValidationSchema>;

const initialFormValues: FormInputValues = {
  email: '',
  password: '',
};

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
  const { t } = useTranslation();

  const formMethods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: initialFormValues,
    resolver: zodResolver(formValidationSchema),
  });
  const { handleSubmit, setError } = formMethods;
  const { mutate: logIn, isPending: isSubmitting } = useLoginFormMutation(setError);
  const submitLoginForm = (formData: FormInputValues): void => {
    logIn(formData as LoginPayload);
  };

  return (
    <>
      <CoreFormHeader
        title={t('loginFormHeader')}
        intent={'small'}
      />
      <FormProvider {...formMethods}>
        <CoreFormWrapper
          formId={'post-account-login-form'}
          onFormSubmit={handleSubmit(submitLoginForm)}
        >
          <CommonInputGroup
            id={'email'}
            type={'email'}
            isDisabled={isSubmitting}
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <PasswordInputGroup
            id={'password'}
            isDisabled={isSubmitting}
            label={t('passwordLabel')}
            placeholder={t('passwordPlaceholder')}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CoreFormAction
            isSubmissionPending={isSubmitting}
            formActionConfig={{
              message: t('loginFormSubmission'),
              value: t('loginFormSubmit'),
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
            label: formTypeButtonLabel[FormType.REGISTER_PENDING_ACCOUNT],
            formType: FormType.REGISTER_PENDING_ACCOUNT,
          },
        }}
      />
    </>
  );
};
