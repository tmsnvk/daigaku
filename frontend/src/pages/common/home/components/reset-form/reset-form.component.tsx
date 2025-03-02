/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useHandleResetForm } from './reset-form.hooks';

/* component imports */
import { GenericInput, InputError, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { FormSwapButtons } from '../form-swap-buttons';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';
import { formTypeButtonLabel } from '../../home.constants';
import { FormHeader } from '../form-header';

/* interface, type, enum imports */
import { AccountResetRequest } from '@common-types';
import { FormType } from '../../home.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
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
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const ResetForm = ({ onFormSelect, showModal }: ComponentProps): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<AccountResetRequest>({ mode: 'onSubmit' });
  const { isPending, mutate } = useHandleResetForm(setError, showModal);

  return (
    <>
      <FormHeader headerContent={l.PAGES.COMMON.HOME.PASSWORD_RESET.FORM.HEADER} />
      <form
        id={'post-account-reset-form'}
        className={'flex flex-col items-center'}
        onSubmit={handleSubmit((formData: AccountResetRequest) => mutate(formData))}
      >
        <GenericInput
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
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={l.PAGES.COMMON.HOME.PASSWORD_RESET.MESSAGES.FORM_LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              id={'reset'}
              name={'reset'}
              value={l.PAGES.COMMON.HOME.PASSWORD_RESET.SUBMIT}
              disabled={isPending}
            />
          )}
          {errors.root && <InputError message={errors.root.message} />}
        </article>
      </form>
      <FormSwapButtons
        leftButtonLabel={formTypeButtonLabel[FormType.LOGIN]}
        leftButtonFormType={FormType.LOGIN}
        rightButtonLabel={formTypeButtonLabel[FormType.REGISTER]}
        rightButtonFormType={FormType.REGISTER}
        onFormSelect={onFormSelect}
        isDisabled={isPending}
      />
    </>
  );
};
