/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import { HandleResetForm, ResetFormFields, useHandleResetForm } from './reset-form.hooks';

/* component, style imports */
import { GenericInput, InputError, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { FormSwapButton } from '../form-swap-button/index';

/* configuration, utilities, constants imports */
import { formTypeButtonLabel } from '../../home.constants';
import { FormInstruction } from '../form-instruction/index';
import { constants } from './reset-form.constants';

/* interface, type, enum imports */
import { ConfirmationModal, FormType, SelectForm, UseFormHook } from '../../home.interfaces';

/**
 * ===============
 * Component {@link HandleResetForm}
 * ===============
 */

/**
 * Defines the component's properties.
 *
 * @since 0.0.1
 */
type ComponentProps = SelectForm & ConfirmationModal;

/**
 * Renders a password reset form that allows users to reset their account.
 * The component utilizes the `react-hook-form` library for form handling, including validation, and manages the form submission using the `react-query` library.
 * Additionally, users can switch to other forms, such as {@link LoginForm} or {@link RegistrationForm} using the {@link FormSwapButton} component.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const ResetForm = ({ selectForm, showModal }: ComponentProps): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  }: UseFormHook<ResetFormFields> = useForm<ResetFormFields>({ mode: 'onSubmit' });
  const { isPending, mutate }: HandleResetForm = useHandleResetForm(setError, showModal);

  return (
    <section>
      <FormInstruction instructionText={constants.uiMessage.FORM_INSTRUCTION} />
      <form
        id={'post-account-reset-form'}
        method={'POST'}
        onSubmit={handleSubmit((formData: ResetFormFields) => mutate(formData))}
      >
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.REQUIRED_EMAIL,
            },
          }}
          type={'email'}
          id={'email'}
          label={constants.form.EMAIL_LABEL}
          placeholder={constants.form.EMAIL_PLACEHOLDER}
          isDisabled={isPending}
          error={errors.email?.message}
        />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={constants.uiMessage.LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              id={'reset'}
              name={'reset'}
              value={constants.form.SUBMIT}
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
