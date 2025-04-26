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
import { useResetFormMutation } from '../hooks';

/* component imports */
import { CommonInputGroup, CoreFormAction, CoreFormHeader, CoreFormWrapper } from '@daigaku/components/form';
import { FormSwapButtons } from './form-swap-buttons';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';
import { formTypeButtonLabel } from '../constants';

/* interface, type, enum imports */
import {
  AccountResetPayload,
  CoreInputElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
} from '@daigaku/common-types';
import { FormType } from '../models';

const formValidationSchema = z.object({
  email: z.string().email({ message: l.PAGES.COMMON.HOME.PASSWORD_RESET.FORM.EMAIL.VALIDATION.REQUIRED }),
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
  const methods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: initialFormValues,
    resolver: zodResolver(formValidationSchema),
  });
  const { handleSubmit, setError } = methods;

  const { mutate: resetAccountPassword, isPending: isSubmitting } = useResetFormMutation(setError, showModal);

  return (
    <>
      <CoreFormHeader
        title={l.PAGES.COMMON.HOME.PASSWORD_RESET.FORM.HEADER}
        intent={'small'}
      />
      <FormProvider {...methods}>
        <CoreFormWrapper
          formId={'post-account-reset-form'}
          onFormSubmit={handleSubmit((formData: FormInputValues) => {
            resetAccountPassword(formData as AccountResetPayload);
          })}
        >
          <CommonInputGroup
            id={'email'}
            type={'email'}
            isDisabled={isSubmitting}
            label={l.PAGES.COMMON.HOME.PASSWORD_RESET.FORM.EMAIL.LABEL}
            placeholder={l.PAGES.COMMON.HOME.PASSWORD_RESET.FORM.EMAIL.PLACEHOLDER}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CoreFormAction
            isSubmissionPending={isSubmitting}
            formActionConfig={{
              message: l.PAGES.COMMON.HOME.PASSWORD_RESET.MESSAGES.FORM_LOADING,
              value: l.PAGES.COMMON.HOME.PASSWORD_RESET.SUBMIT,
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
