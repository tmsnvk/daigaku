import { useForm } from 'react-hook-form';
import {
  ForgottenPasswordFormFieldsT,
  useSubmitForgottenPasswordForm,
} from './ForgottenPasswordForm.hooks.tsx';
import FormSwapButton from '../FormSwapButton';
import { TextParagraph } from '@components/shared/general';
import {
  ErrorMessage,
  LoadingIndicator,
  SubmitInput,
} from '@components/shared/form';
import { GeneralInputField } from '@components/shared/field-implementations';
import {
  ConfirmationModalT,
  FormSelectorT,
  FormTypeE,
} from '@pages/shared/Home/Home.types.ts';

type ComponentPropsT = FormSelectorT & ConfirmationModalT;

const ForgottenPasswordForm = ({ formSelector, showModal }: ComponentPropsT) => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<ForgottenPasswordFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, mutate } = useSubmitForgottenPasswordForm({ setError, showModal });

  return (
    <section>
      <TextParagraph
        content={'Request a password reset if you have forgotten your password. Do not request a reset if you have not yet activated your account.'}
      />
      <form id={'postAccountForgottenPasswordForm'} method={'POST'} onSubmit={handleSubmit((formData) => mutate(formData))}>
        <GeneralInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: 'Providing your email address is required.',
            },
          }}
          fieldError={errors.email?.message}
          fieldId={'email'}
          labelContent={'Email'}
          type={'email'}
          placeholder={'Enter your email address'}
          isDisabled={isPending}
        />
        <article>
          {
            isPending ?
              <LoadingIndicator content={'Your registration is being handled.'} /> :
              <SubmitInput type={'submit'} value={'reset'} disabled={isPending} />
          }
          {errors.root?.serverError && <ErrorMessage content={errors.root.serverError.message as string} />}
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
