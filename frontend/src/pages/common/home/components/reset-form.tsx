/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

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
  AccountResetRequest,
  CoreInputElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
} from '@daigaku/common-types';
import { FormType } from '../models';

/**
 * Defines the component's properties.
 */
interface ResetFormProps {
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
 * @param {ResetFormProps} props
 * @return {JSX.Element}
 */
export const ResetForm = ({ onFormSelect, showModal }: ResetFormProps): JSX.Element => {
  const methods = useForm<AccountResetRequest>({ mode: 'onSubmit' });
  const {
    formState: { errors },
    handleSubmit,
    setError,
  } = methods;

  const { isPending, mutate } = useResetFormMutation(setError, showModal);

  return (
    <>
      <CoreFormHeader
        title={l.PAGES.COMMON.HOME.PASSWORD_RESET.FORM.HEADER}
        intent={'small'}
      />
      <FormProvider {...methods}>
        <CoreFormWrapper
          formId={'post-account-reset-form'}
          onFormSubmit={handleSubmit((formData: AccountResetRequest) => {
            mutate(formData);
          })}
        >
          <CommonInputGroup
            validationRules={{
              required: {
                value: true,
                message: l.PAGES.COMMON.HOME.PASSWORD_RESET.FORM.EMAIL.VALIDATION.REQUIRED,
              },
            }}
            type={'email'}
            id={'email'}
            label={l.PAGES.COMMON.HOME.PASSWORD_RESET.FORM.EMAIL.LABEL}
            placeholder={l.PAGES.COMMON.HOME.PASSWORD_RESET.FORM.EMAIL.PLACEHOLDER}
            isDisabled={isPending}
            error={errors.email?.message}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CoreFormAction
            isSubmissionPending={isPending}
            submissionMessage={l.PAGES.COMMON.HOME.PASSWORD_RESET.MESSAGES.FORM_LOADING}
            submitId={'reset'}
            submissionValue={l.PAGES.COMMON.HOME.PASSWORD_RESET.SUBMIT}
            errorMessage={errors.root?.message}
            submitButtonStyleIntent={CoreSubmitInputElementStyleIntent.DARK}
          />
        </CoreFormWrapper>
      </FormProvider>
      <FormSwapButtons
        buttonConfig={{
          leftButton: {
            label: formTypeButtonLabel[FormType.LOGIN],
            formType: FormType.LOGIN,
          },
          rightButton: {
            label: formTypeButtonLabel[FormType.REGISTER],
            formType: FormType.REGISTER,
          },
        }}
        isDisabled={isPending}
        onFormSelect={onFormSelect}
      />
    </>
  );
};
