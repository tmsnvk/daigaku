import { useForm } from 'react-hook-form';
import {
  LoginFormFieldsT,
  useSubmitLoginForm,
} from './LoginForm.hooks.tsx';
import { FormSwapButton } from '@components/page/home';
import { GenericTextParagraph } from '@components/shared/general';
import {
  ErrorMessage,
  LoadingIndicator,
  SubmitInput,
} from '@components/shared/form';
import {
  GeneralInputField,
  PasswordInputField,
} from '@components/shared/field-implementations';
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
      <GenericTextParagraph
        content={'Sign in if you already have an admin-approved profile, otherwise, apply for an account first.'}
      />
      <form id={'postAccountLoginForm'} method={'POST'} onSubmit={handleSubmit((formData) => mutate(formData))}>
        <GeneralInputField
          register={register}
          validation={{
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
        <PasswordInputField
          register={register}
          validation={{
            required: {
              value: true,
              message: 'Providing your password is required.',
            },
          }}
          fieldError={errors.password?.message}
          fieldId={'password'}
          label={'Password'}
          placeholder={'Enter your password'}
          isDisabled={isPending}
        />
        <article>
          {
            isPending ?
              <LoadingIndicator message={'You are being logged in.'} /> :
              <SubmitInput type={'submit'} value={'sign in'} disabled={isPending} />
          }
          {errors.root?.serverError && <ErrorMessage error={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton formType={FormTypeE.Reset} buttonContent={'Forgot password?'} clickHandler={formSelector} isDisabled={isPending} />
        <FormSwapButton formType={FormTypeE.Register} buttonContent={'Create account'} clickHandler={formSelector} isDisabled={isPending} />
      </article>
    </section>
  );
};

export default LoginForm;
