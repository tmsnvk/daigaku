import { useForm } from 'react-hook-form';
import {
  ForgottenPasswordFormFieldsT,
  useSubmitForgottenPasswordForm,
} from './ForgottenPasswordForm.hooks.tsx';
import FormSwapButton from '../FormSwapButton';
import {
  LoadingIndicator,
  TextParagraph,
} from '@components/general';
import {
  InputError,
  SubmitInput,
} from '@components/form';
import { GenericInputField } from '@components/input-implementations';
import {
  ConfirmationModalT,
  FormSelectorT,
  FormTypeE,
} from '../../Home.types.ts';

type ComponentPropsT = FormSelectorT & ConfirmationModalT;

const ForgottenPasswordForm = ({ formSelector, showModal }: ComponentPropsT) => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<ForgottenPasswordFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, mutate } = useSubmitForgottenPasswordForm({ setError, showModal });

  return (
    <section>
      <TextParagraph
        content={'Request a password reset if you have forgotten your password. Do not request a reset if your account is not yet activated.'}
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
          {
            isPending ?
              <LoadingIndicator content={'Your registration is being handled.'} /> :
              <SubmitInput type={'submit'} name={'forgotten-password'} value={'reset'} disabled={isPending} />
          }
          {errors.root?.serverError && <InputError content={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton
          formType={FormTypeE.LOGIN}
          content={'Log in'}
          clickHandler={formSelector}
          isDisabled={isPending}
        />
        <FormSwapButton
          formType={FormTypeE.REGISTER}
          content={'Create account'}
          clickHandler={formSelector}
          isDisabled={isPending}
        />
      </article>
    </section>
  );
};

export default ForgottenPasswordForm;
