/**
 * @prettier
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import { useGetInstitutionOptions } from '@hooks/institution';
import { useGetStudentAndMentorAccountRoles } from '@hooks/role';
import { RegisterFormFields, SubmitRegistrationForm, useSubmitRegistrationForm } from './registration-form.hooks';

/* component, style imports */
import { GenericInputField, InputError, SelectAccountRole, SelectInstitution, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { FormSwapButton } from '../form-swap-button/index';

/* utilities imports */
import { FormInstruction } from '../form-instruction/index';

/* interface, type, enum imports */
import { ListQueryResult } from '@common-types';
import { RoleOption } from '@services/role/role.service';
import { InstitutionOption } from '@services/support/institution.service';
import { ConfirmationModal, FormType, SelectForm } from '../../home.types';

/* interfaces, types, enums */
type ComponentProps = SelectForm & ConfirmationModal;

/**
 * @description
 * - The {@link ResetForm} component is responsible for rendering a login form that allows users to submit their email and password for authentication.
 * - The component utilizes the `react-hook-form` library for form handling, including validation, and manages the form submission using the `react-query` library.
 * - Additionally, users can switch to other forms, such as {@link LoginForm} or {@link RegistrationForm} using the {@link FormSwapButton} components.
 *
 * @param {Function} props.selectForm - A function that handles {@link FormType} switching.
 * @param {Function} props.showModal - A function to show the {@link ConfirmationModal}, used in form components.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const RegistrationForm = ({ selectForm, showModal }: ComponentProps): JSX.Element => {
  const {
    data: institutionData,
    isLoading: isInstitutionLoading,
    isError: isInstitutionError,
  }: ListQueryResult<InstitutionOption> = useGetInstitutionOptions();
  const {
    data: roleData,
    isLoading: isRoleLoading,
    isError: isRoleError,
  }: ListQueryResult<RoleOption> = useGetStudentAndMentorAccountRoles();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterFormFields>({ mode: 'onSubmit' });
  const { isPending, mutate, error }: SubmitRegistrationForm = useSubmitRegistrationForm({ setError, showModal });

  if (isInstitutionLoading || isRoleLoading) {
    return <GlobalLoadingModal message={'The application is fetching the registration data...'} />;
  }

  if (isInstitutionError || isRoleError) {
    return <GlobalErrorModal message={error?.response.data.root as string} />;
  }

  return (
    <section>
      <FormInstruction content={'Register an account if you are not in our system yet.'} />
      <form
        id={'postPendingAccountRegisterForm'}
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
              value: /^[\p{L}\s]{2,100}$/u,
              message: 'Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.',
            },
          }}
          error={errors.firstName?.message}
          id={'firstName'}
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
              value: /^[\p{L}\s]{2,100}$/u,
              message: 'Use only letters and spaces. Provide a minimum of 2 and a maximum of 100 characters.',
            },
          }}
          error={errors.lastName?.message}
          id={'lastName'}
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
          error={errors.email?.message}
          id={'email'}
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
          institutionOptions={institutionData ?? []}
        />
        <SelectAccountRole
          register={register}
          fieldError={errors.accountRoleUuid?.message}
          fieldId={'accountRoleUuid'}
          isDisabled={isPending}
          roleOptions={roleData ?? []}
        />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={'Your registration is being submitted.'} />
          ) : (
            <SubmitInput
              type={'submit'}
              name={'register'}
              value={'register'}
              disabled={isPending}
            />
          )}
          {errors.root?.serverError && <InputError errorText={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton
          formType={FormType.RESET}
          buttonLabel={'Forgot password?'}
          onFormSelect={selectForm}
          isDisabled={isPending}
        />
        <FormSwapButton
          formType={FormType.LOGIN}
          buttonLabel={'Log in'}
          onFormSelect={selectForm}
          isDisabled={isPending}
        />
      </article>
    </section>
  );
};
