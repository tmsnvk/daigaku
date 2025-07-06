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
import { useLoginFormMutation } from '../hooks/use-login-form-mutation.tsx';
import { LoginSchema, loginSchema } from '../schema.ts';

/* component imports */
import {
  CommonInputGroup,
  CoreFormAction,
  CoreFormHeader,
  CoreFormWrapper,
  PasswordInputGroup,
} from '@daigaku/components/form';
import { FormSwapButtons } from '../../common/components/form-swap-buttons.tsx';

/* configuration, constants imports */
import { formTypeButtonLabel } from '../../common/constants.ts';

/* interface, type imports */
import { LoginPayload } from '@daigaku/common-types';
import { FormType, FormTypes } from '../../common/types.ts';

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
 * Renders a login form component allowing users to submit their email and password for authentication. Additionally,
 * users can switch to other forms.
 *
 * @param {LoginFormProps} props
 * @return {JSX.Element}
 */
export const LoginForm = ({ onFormSelect }: LoginFormProps): JSX.Element => {
  const { t } = useTranslation();

  const formMethods = useForm<LoginSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
    resolver: standardSchemaResolver(loginSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { isDirty, isValid, isSubmitting },
  } = formMethods;

  const { mutate: logIn } = useLoginFormMutation(setError);

  return (
    <>
      <CoreFormHeader
        title={t('loginFormHeader')}
        intent={'small'}
      />
      <FormProvider {...formMethods}>
        <CoreFormWrapper
          formId={'post-account-login-form'}
          onFormSubmit={handleSubmit((formData: LoginSchema) => {
            logIn(formData as LoginPayload);
          })}
        >
          <CommonInputGroup
            id={'email'}
            type={'email'}
            isDisabled={isSubmitting}
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
            intent={'light'}
          />
          <PasswordInputGroup
            id={'password'}
            isDisabled={isSubmitting}
            label={t('passwordLabel')}
            placeholder={t('passwordPlaceholder')}
            intent={'light'}
          />
          <CoreFormAction
            isDisabled={!isDirty || !isValid}
            isSubmissionPending={isSubmitting}
            formActionConfig={{
              message: t('loginFormSubmission'),
              value: t('loginFormSubmit'),
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
            label: formTypeButtonLabel[FormTypes.REGISTER_PENDING_ACCOUNT],
            formType: FormTypes.REGISTER_PENDING_ACCOUNT,
          },
        }}
      />
    </>
  );
};
