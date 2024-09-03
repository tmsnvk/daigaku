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
import { GenericInputField, InputError, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { FormSwapButton } from '../form-swap-button/index';

/* configuration, utilities, constants imports */
import { formTypeButtonLabel } from '../../home.utilities';
import { FormInstruction } from '../form-instruction/index';
import { constants } from './reset-form.constants';

/* interface, type, enum imports */
import { ConfirmationModal, FormType, SelectForm, UseFormHook } from '../../home.types';

/**
 * ===============
 * Component {@link HandleResetForm}
 * ===============
 */

/* interfaces, types, enums */
type ComponentProps = SelectForm & ConfirmationModal;

/*
 * component - TODO - add functionality description
 */
export const ResetForm = ({ selectForm, showModal }: ComponentProps): JSX.Element => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  }: UseFormHook<ResetFormFields> = useForm<ResetFormFields>({ mode: 'onSubmit' });
  const { isPending, mutate }: HandleResetForm = useHandleResetForm({ setError, showModal });

  return (
    <section>
      <FormInstruction content={constants.uiMessage.FORM_INSTRUCTION} />
      <form
        id={'post-account-reset-form'}
        method={'POST'}
        onSubmit={handleSubmit((formData: ResetFormFields) => mutate(formData))}
      >
        <GenericInputField
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
          {errors.root && <InputError errorText={errors.root.message} />}
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
