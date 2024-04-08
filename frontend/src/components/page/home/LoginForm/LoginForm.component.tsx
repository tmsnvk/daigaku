import { useForm } from 'react-hook-form';
import {
  LoginFormFieldsT,
  useSubmitLoginForm,
} from './LoginForm.hooks.tsx';
import { TextParagraph } from '@components/shared/general';
import {
  ErrorMessage,
  LoadingIndicator,
  SubmitInput,
} from '@components/shared/form';
import {
  GenericInputField,
  PasswordInputField,
} from '@components/shared/field-implementations';
import FormSwapButton from '../FormSwapButton';
import {
  FormSelectorT,
  FormTypeE,
} from '@pages/shared/Home/Home.types.ts';

type ComponentPropsT = FormSelectorT;

const LoginForm = ({ formSelector }: ComponentPropsT) => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<LoginFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, mutate } = useSubmitLoginForm({ setError });

  return (
    <section>
      <TextParagraph
        content={'Sign in if you already have an admin-approved account, otherwise, apply for one first.'}
      />
      <form
        id={'postAccountLoginForm'}
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
          labelContent={'Email'}
          type={'email'}
          placeholder={'Enter your email address'}
          isDisabled={isPending}
        />
        <PasswordInputField
          register={register}
          validationRules={{
            required: {
              value: true,
              message: 'Providing your password is required.',
            },
          }}
          fieldError={errors.password?.message}
          fieldId={'password'}
          labelContent={'Password'}
          placeholder={'Enter your password'}
          isDisabled={isPending}
        />
        <article>
          {
            isPending ?
              <LoadingIndicator content={'You are being logged in.'} /> :
              <SubmitInput type={'submit'} value={'sign in'} disabled={isPending} />
          }
          {errors.root?.serverError && <ErrorMessage content={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton
          formType={FormTypeE.RESET}
          content={'Forgot password?'}
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

export default LoginForm;
