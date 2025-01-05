/**
 * @prettier
 */

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
import { formTypeButtonLabel } from '../../home.constants';
import { FormInstruction } from '../form-instruction';
import { constants } from './reset-form.constants';

/* interface, type, enum imports */
import { AccountResetRequest } from '@common-types';
import { FormType } from '../../home.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * A function to select the current form type.
   * @param formType The type of the form to be selected.
   */
  selectForm: (formType: FormType) => void;

  /**
   * A function to show a modal.
   */
  showModal: () => void;
}

/**
 * Renders a password reset form component that allows users to reset their account access.
 * The component utilizes the `react-hook-form` and `react-query` libraries for managing the form submission.
 * Additionally, users can switch to other forms on the page using the {@link FormSwapButton} component.
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
    <section>
      <FormInstruction instructionText={constants.ui.form.INSTRUCTION} />
      <form
        id={'post-account-reset-form'}
        method={'POST'}
        onSubmit={handleSubmit((formData: AccountResetRequest) => mutate(formData))}
      >
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.email.REQUIRED,
            },
          }}
          type={'email'}
          id={'email'}
          label={constants.ui.form.fields.EMAIL.LABEL}
          placeholder={constants.ui.form.fields.EMAIL.PLACEHOLDER}
          isDisabled={isPending}
          error={errors.email?.message}
        />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={constants.ui.messages.LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              id={'reset'}
              name={'reset'}
              value={constants.ui.form.SUBMIT}
              disabled={isPending}
            />
          )}
          {errors.root && <InputError message={errors.root.message} />}
        </article>
      </form>
      <article>
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
