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
import { useLoginForm } from '../hooks/use-login-form.tsx';
import { LoginSchema, loginSchema } from '../schema.ts';

/* component imports */
import {
  FormHeader,
  FormWrapper,
  InputGroup,
  PasswordInputGroup,
  SubmitInputGroup,
} from '@daigaku/components/common/form';
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

  const { handleSubmit, setError } = formMethods;

  const { mutate: logIn, isPending: isSubmitting } = useLoginForm(setError);

  const onFormSubmit = handleSubmit((formData: LoginSchema) => {
    logIn(formData as LoginPayload);
  });

  return (
    <>
      <FormHeader
        intent={'small'}
        title={t('app.page.root.login.form.header')}
      />
      <FormProvider {...formMethods}>
        <FormWrapper
          formId={'account-login-form'}
          onFormSubmit={onFormSubmit}
        >
          <InputGroup
            disabled={isSubmitting}
            id={'email'}
            intent={'light'}
            label={t('app.page.root.login.form.emailLabel')}
            placeholder={t('app.page.root.login.form.emailPlaceholder')}
            type={'email'}
          />
          <PasswordInputGroup
            disabled={isSubmitting}
            id={'password'}
            intent={'light'}
            label={t('app.page.root.login.form.passwordLabel')}
            placeholder={t('app.page.root.login.form.passwordPlaceholder')}
          />
          <SubmitInputGroup
            formActionConfig={{
              message: t('app.page.root.login.form.loadingText'),
              value: t('app.page.root.login.form.submitButton'),
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
            label: formTypeButtonLabel[FormTypes.REGISTER_PENDING_ACCOUNT],
            formType: FormTypes.REGISTER_PENDING_ACCOUNT,
          },
        }}
        disabled={isSubmitting}
        onFormSelect={onFormSelect}
      />
    </>
  );
};
