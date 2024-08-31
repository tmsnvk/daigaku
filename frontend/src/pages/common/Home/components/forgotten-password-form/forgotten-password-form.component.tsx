/**
 * @prettier
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import { ForgottenPasswordFormFields, SubmitForgottenPasswordForm, useSubmitForgottenPasswordForm } from './forgotten-password-form.hooks';

/* component, style imports */
import { LoadingIndicator } from '@components/general';
import { GenericInputField, InputError, SubmitInput } from '@components/form';
import { FormSwapButton } from '../form-swap-button/index';

/* utilities imports */
import { FormInstructionText } from '../form-instruction-text/index';

/* interface, type, enum imports */
import { ConfirmationModal, FormSelector, FormType } from '../../home.types';

/* interfaces, types, enums */
type ComponentProps = FormSelector & ConfirmationModal;

/*
 * component - TODO - add functionality description
 */
export const ForgottenPasswordForm = ({ formSelector, showModal }: ComponentProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<ForgottenPasswordFormFields>({ mode: 'onSubmit' });
  const { isPending, mutate }: SubmitForgottenPasswordForm = useSubmitForgottenPasswordForm({ setError, showModal });

  return (
    <section>
      <FormInstructionText
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
          fieldError={errors.email?.message}
          fieldId={'email'}
          label={'Email'}
          type={'email'}
          placeholder={'Enter your email address'}
          isDisabled={isPending}
        />
        <article>
          {isPending ? (
            <LoadingIndicator message={'Your registration is being handled.'} />
          ) : (
            <SubmitInput
              type={'submit'}
              name={'forgotten-password'}
              value={'reset'}
              disabled={isPending}
            />
          )}
          {errors.root?.serverError && <InputError message={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton
          formType={FormType.LOGIN}
          content={'Log in'}
          clickHandler={formSelector}
          isDisabled={isPending}
        />
        <FormSwapButton
          formType={FormType.REGISTER}
          content={'Create account'}
          clickHandler={formSelector}
          isDisabled={isPending}
        />
      </article>
    </section>
  );
};
