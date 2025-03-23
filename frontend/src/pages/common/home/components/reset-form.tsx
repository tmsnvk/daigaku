/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useResetFormMutation } from '../hooks';

/* component imports */
import { FormAction } from './form-action';
import { FormHeader } from './form-header';
import { FormSwapButtons } from './form-swap-buttons';
import { FormWrapper } from './form-wrapper';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';
import { formTypeButtonLabel } from '../constants';

/* interface, type, enum imports */
import { AccountResetRequest } from '@common-types';
import { CommonInputGroup } from '@components/form/common-input-group';
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
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<AccountResetRequest>({ mode: 'onSubmit' });
  const { isPending, mutate } = useResetFormMutation(setError, showModal);

  return (
    <>
      <FormHeader headerContent={l.PAGES.COMMON.HOME.PASSWORD_RESET.FORM.HEADER} />
      <FormWrapper
        formId={'post-account-reset-form'}
        onFormSubmitHandler={handleSubmit((formData: AccountResetRequest) => mutate(formData))}
      >
        <CommonInputGroup
          register={register}
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
        />
        <FormAction
          isSubmissionPending={isPending}
          submissionMessage={l.PAGES.COMMON.HOME.PASSWORD_RESET.MESSAGES.FORM_LOADING}
          submissionId={'reset'}
          submissionValue={l.PAGES.COMMON.HOME.PASSWORD_RESET.SUBMIT}
          errorMessage={errors.root?.message}
        />
      </FormWrapper>
      <FormSwapButtons
        leftButtonLabel={formTypeButtonLabel[FormType.LOGIN]}
        leftButtonFormType={FormType.LOGIN}
        rightButtonLabel={formTypeButtonLabel[FormType.REGISTER]}
        rightButtonFormType={FormType.REGISTER}
        isDisabled={isPending}
        onFormSelect={onFormSelect}
      />
    </>
  );
};
