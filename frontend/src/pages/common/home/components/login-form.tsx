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
import { localization as l } from '@daigaku/constants';
import { formTypeButtonLabel } from '../constants';

/* interface, type, enum imports */
import { CoreInputElementStyleIntent, CoreSubmitInputElementStyleIntent, LoginPayload } from '@daigaku/common-types';
import { FormType } from '../models';

const formValidationSchema = z.object({
  email: z.string().email({ message: l.PAGES.COMMON.HOME.LOGIN.FORM.EMAIL.VALIDATION.REQUIRED }),
  password: z.string().trim().nonempty({ message: l.PAGES.COMMON.HOME.LOGIN.FORM.PASSWORD.VALIDATION.REQUIRED }),
});

type FormInputValues = z.infer<typeof formValidationSchema>;

const initialFormValues: FormInputValues = {
  email: '',
  password: '',
};

const FORM_ID = 'post-account-login-form';

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
  const methods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: initialFormValues,
    resolver: zodResolver(formValidationSchema),
  });
  const { handleSubmit, setError } = methods;

  const { mutate: logIn, isPending: isSubmitting } = useLoginFormMutation(setError);

  return (
    <>
      <CoreFormHeader
        title={l.PAGES.COMMON.HOME.LOGIN.FORM.HEADER}
        intent={'small'}
      />
      <FormProvider {...methods}>
        <CoreFormWrapper
          formId={FORM_ID}
          onFormSubmit={handleSubmit((formData: FormInputValues) => {
            logIn(formData as LoginPayload);
          })}
        >
          <CommonInputGroup
            id={'email'}
            type={'email'}
            isDisabled={isSubmitting}
            label={l.PAGES.COMMON.HOME.LOGIN.FORM.EMAIL.LABEL}
            placeholder={l.PAGES.COMMON.HOME.LOGIN.FORM.EMAIL.PLACEHOLDER}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <PasswordInputGroup
            id={'password'}
            isDisabled={isSubmitting}
            label={l.PAGES.COMMON.HOME.LOGIN.FORM.PASSWORD.LABEL}
            placeholder={l.PAGES.COMMON.HOME.LOGIN.FORM.PASSWORD.PLACEHOLDER}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CoreFormAction
            submitId={FORM_ID}
            isSubmissionPending={isSubmitting}
            formActionConfig={{
              message: l.PAGES.COMMON.HOME.LOGIN.MESSAGES.PAGE_LOADING,
              value: l.PAGES.COMMON.HOME.LOGIN.FORM.SUBMIT,
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
