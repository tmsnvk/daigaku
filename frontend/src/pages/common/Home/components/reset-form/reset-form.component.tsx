/**
 * @prettier
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import { ForgottenPasswordFormFields, SubmitForgottenPasswordForm, useSubmitForgottenPasswordForm } from './reset-form.hooks';

/* component, style imports */
import { GenericInputField, InputError, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { FormSwapButton } from '../form-swap-button/index';

/* utilities imports */
import { FormInstruction } from '../form-instruction/index';

/* interface, type, enum imports */
import { ConfirmationModal, FormSelector, FormType } from '../../home.types';

/* interfaces, types, enums */
type ComponentProps = FormSelector & ConfirmationModal;

/*
 * component - TODO - add functionality description
 */
export const ResetForm = ({ formSelector, showModal }: ComponentProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<ForgottenPasswordFormFields>({ mode: 'onSubmit' });
  const { isPending, mutate }: SubmitForgottenPasswordForm = useSubmitForgottenPasswordForm({ setError, showModal });

  return (
    <section>
      <FormInstruction
        content={
          'Request a password reset if you have forgotten your password. Do not request a reset if your account is not yet activated.'
        }
      />
      <form
        id={'postAccountForgottenPasswordForm'}
        method={'POST'}
        onSubmit={handleSubmit((formData) => mutate(formData))}
      >
        <GenericInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: 'Providing your email address is required.',
            },
          }}
          error={errors.email?.message}
          id={'email'}
          label={'Email'}
          type={'email'}
          placeholder={'Enter your email address'}
          isDisabled={isPending}
        />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={'Your registration is being handled.'} />
          ) : (
            <SubmitInput
              type={'submit'}
              name={'forgotten-password'}
              value={'reset'}
              disabled={isPending}
            />
          )}
          {errors.root?.serverError && <InputError errorText={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton
          formType={FormType.LOGIN}
          buttonLabel={'Log in'}
          onFormSelect={formSelector}
          isDisabled={isPending}
        />
        <FormSwapButton
          formType={FormType.REGISTER}
          buttonLabel={'Create account'}
          onFormSelect={formSelector}
          isDisabled={isPending}
        />
      </article>
    </section>
  );
};
