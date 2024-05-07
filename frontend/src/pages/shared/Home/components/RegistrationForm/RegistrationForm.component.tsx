import { useForm } from 'react-hook-form';
import {
  RegisterFormFieldsT,
  useGetInstitutionOptions,
  useSubmitRegistrationForm,
} from './RegistrationForm.hooks.tsx';
import { TextParagraph } from '@components/general';
import {
  InputError,
  LoadingIndicator,
  SubmitInput,
} from '@components/form';
import {
  GenericInputField,
  SelectInstitution,
} from '@components/field-implementations';
import {
  GlobalErrorModal,
  GlobalLoadingModal,
} from '@components/notification';
import FormSwapButton from '../FormSwapButton';
import SelectAccountType from '../SelectAccountType';
import {
  ConfirmationModalT,
  FormSelectorT,
  FormTypeE,
} from '../../Home.types.ts';

type ComponentPropT = FormSelectorT & ConfirmationModalT;

const RegistrationForm = ({ formSelector, showModal }: ComponentPropT) => {
  const { data, isLoading, isError } = useGetInstitutionOptions();
  const { formState: { errors }, handleSubmit, register, setError } = useForm<RegisterFormFieldsT>({ mode: 'onSubmit' });
  const { isPending, mutate, error } = useSubmitRegistrationForm({ setError, showModal });

  if (isLoading) {
    return <GlobalLoadingModal />;
  }

  if (isError) {
    return <GlobalErrorModal error={error?.response.data.root as string} />;
  }

  return (
    <section>
      <TextParagraph
        content={'Register an account if you are not in our system yet.'}
      />
      <form
        id={'postAccountRegisterForm'}
        method={'POST'}
        onSubmit={handleSubmit((formData) => mutate(formData))}
      >
        <GenericInputField
          register={register}
          validationRules={{
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
        <GenericInputField
          register={register}
          validationRules={{
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
        <SelectInstitution
          register={register}
          fieldError={errors.institutionUuid?.message}
          fieldId={'institutionUuid'}
          isDisabled={isPending}
          data={data ?? []}
        />
        <SelectAccountType
          register={register}
          fieldError={errors.accountType?.message}
          fieldId={'accountType'}
          isDisabled={isPending}
        />
        <article>
          {
            isPending ?
              <LoadingIndicator content={'Your registration is being handled.'} /> :
              <SubmitInput type={'submit'} value={'register'} disabled={isPending} />
          }
          {errors.root?.serverError && <InputError content={errors.root.serverError.message as string} />}
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
          formType={FormTypeE.LOGIN}
          content={'Log in'}
          clickHandler={formSelector}
          isDisabled={isPending}
        />
      </article>
    </section>
  );
};

export default RegistrationForm;
