import { useForm } from 'react-hook-form';
import { FormSwapButton } from '@components/page/home';
import { GenericTextParagraph } from '@components/shared/general';
import {
  ErrorMessage,
  LoadingIndicator,
  SubmitInput,
} from '@components/shared/form';
import { GeneralInputField } from '@components/shared/field-implementations';
import theme from '@theme/theme.ts';
import {
  RegisterFormFieldsT,
  useSubmitRegisterForm,
} from './RegisterForm.hooks.tsx';
import {
  ConfirmationModalT,
  FormSelectorT,
  FormTypeE,
} from '@pages/Home/Home.types.ts';

type ComponentPropT = FormSelectorT & ConfirmationModalT;

const RegisterForm = ({ formSelector, showModal }: ComponentPropT) => {
  const { formState: { errors }, handleSubmit, register, setError } = useForm<RegisterFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, onSubmit } = useSubmitRegisterForm({ setError, showModal });

  return (
    <section>
      <GenericTextParagraph
        content={'Register an account if you are not in our system yet.'}
        fontSize={theme.fontSize.medium}
      />
      <form id={'userRegistrationForm'} method={'POST'} onSubmit={handleSubmit(onSubmit)}>
        <GeneralInputField
          register={register}
          validation={{
            required: {
              value: true,
              message: 'Providing your first name is required.',
            },
            pattern: {
              value: /^[A-Za-z-\s]{2,100}$/,
              message: 'Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.',
            },
          }}
          fieldError={errors.firstName?.message}
          fieldId={'firstName'}
          label={'First Name'}
          type={'text'}
          placeholder={'Enter your first name(s)'}
          isDisabled={isPending}
        />
        <GeneralInputField
          register={register}
          validation={{
            required: {
              value: true,
              message: 'Providing your last name is required.',
            },
            pattern: {
              value: /^[A-Za-z-\s]{2,100}$/,
              message: 'Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.',
            },
          }}
          fieldError={errors.lastName?.message}
          fieldId={'lastName'}
          label={'Last Name'}
          type={'text'}
          placeholder={'Enter your last name(s)'}
          isDisabled={isPending}
        />
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
        <article>
          {
            isPending ?
              <LoadingIndicator message={'Your registration is being handled.'} /> :
              <SubmitInput type={'submit'} value={'register'} disabled={isPending} />
          }
          {errors.root?.serverError && <ErrorMessage error={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton formType={FormTypeE.Reset} buttonContent={'Forgot password?'} clickHandler={formSelector} />
        <FormSwapButton formType={FormTypeE.Login} buttonContent={'Log in'} clickHandler={formSelector} />
      </article>
    </section>
  );
};

export default RegisterForm;
