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

/* component, style imports */
import { GenericInput, InputError, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { FormSwapButton } from '../form-swap-button';

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
   * A methods that selects the current form type.
   *
   * @param formType The type of the form to be selected.
   */
  selectForm: (formType: FormType) => void;

  /**
   * A method that displays a modal.
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
export const ResetForm = ({ selectForm, showModal }: ComponentProps): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<AccountResetRequest>({ mode: 'onSubmit' });
  const { isPending, mutate } = useHandleResetForm(setError, showModal);

  return (
    <section className={'base-light-border home-page-form-section'}>
      <FormHeader headerContent={l.PAGES.COMMON.HOME.PASSWORD_RESET.FORM.INSTRUCTION} />
      <form
        id={'post-account-reset-form'}
        className={'home-page-form'}
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
      <article className={'home-page-form-swap-button-article'}>
        <FormSwapButton
          formType={FormType.LOGIN}
          buttonLabel={formTypeButtonLabel[FormType.LOGIN]}
          onFormSelect={selectForm}
          isDisabled={isPending}
        />
        <FormSwapButton
          formType={FormType.REGISTER}
          buttonLabel={formTypeButtonLabel[FormType.REGISTER]}
          onFormSelect={selectForm}
          isDisabled={isPending}
        />
      </article>
    </section>
  );
};
