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
import { LoadingIndicator } from '@components/general';
import { GenericInputField, InputError, SelectAccountRole, SelectInstitution, SubmitInput } from '@components/form';
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { FormSwapButton } from '../form-swap-button/index';

/* utilities imports */
import { FormInstructionText } from '../form-instruction-text/index';

/* interface, type, enum imports */
import { ConfirmationModal, FormSelector, FormType } from '../../hhome.types';
import { InstitutionOption } from '@services/support/institution.service';
import { RoleOption } from '@services/role/role.service';
import { ListQueryResult } from '@common-types';

/* interfaces, types, enums */
type ComponentProps = FormSelector & ConfirmationModal;

/*
 * component - TODO - add functionality description
 */
export const RegistrationForm = ({ formSelector, showModal }: ComponentProps) => {
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
      <FormInstructionText content={'Register an account if you are not in our system yet.'} />
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
              value: /^[\p{L}\s]{2,100}$/u,
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
            <LoadingIndicator message={'Your registration is being submitted.'} />
          ) : (
            <SubmitInput
              type={'submit'}
              name={'register'}
              value={'register'}
              disabled={isPending}
            />
          )}
          {errors.root?.serverError && <InputError message={errors.root.serverError.message as string} />}
        </article>
      </form>
      <article>
        <FormSwapButton
          formType={FormType.RESET}
          content={'Forgot password?'}
          clickHandler={formSelector}
          isDisabled={isPending}
        />
        <FormSwapButton
          formType={FormType.LOGIN}
          content={'Log in'}
          clickHandler={formSelector}
          isDisabled={isPending}
        />
      </article>
    </section>
  );
};
