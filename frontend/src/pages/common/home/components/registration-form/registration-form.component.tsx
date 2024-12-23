/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useGetInstitutionOptions } from '@hooks/institution';
import { useGetStudentAndMentorAccountRoles } from '@hooks/role';
import { useSubmitRegistrationForm } from './registration-form.hooks';

/* component, style imports */
import { AccountRoleDropdown, GenericInput, InputError, InstitutionDropdown, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { FormInstruction } from '../form-instruction';
import { FormSwapButton } from '../form-swap-button';

/* configuration, utilities, constants imports */
import { formTypeButtonLabel } from '../../home.constants';
import { constants } from './registration-form.constants';

/* interface, type, enum imports */
import {
  ConfirmationModal,
  FormType,
  InstitutionOption,
  ListQueryResult,
  RegistrationFormFields,
  RoleOption,
  SelectForm,
  UseFormHook,
} from '@common-types';
import { HandleRegistrationForm } from './registration-form.models';

/**
 * Defines the component's properties.
 */
type ComponentProps = SelectForm & ConfirmationModal;

/**
 * Renders a registration form that allows users to submit a form to get a pending account.
 * The component utilizes the `react-hook-form` library for form handling,
 * including validation, and manages the form submission using the `react-query` library.
 * Additionally, users can switch to other forms, such as {@link LoginForm} or {@link ResetForm} using the {@link FormSwapButton} component.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const RegistrationForm = ({ selectForm, showModal }: ComponentProps): JSX.Element => {
  // Custom hook that fetches all InstitutionOptions.
  const {
    data: institutions,
    isLoading: isInstitutionLoading,
    isError: isInstitutionError,
  }: ListQueryResult<InstitutionOption> = useGetInstitutionOptions();

  // Custom hook that fetches the student and mentor authentication roles.
  const { data: roles, isLoading: isRoleLoading, isError: isRoleError }: ListQueryResult<RoleOption> = useGetStudentAndMentorAccountRoles();

  // `react-hook-form` handling hook.
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  }: UseFormHook<RegistrationFormFields> = useForm<RegistrationFormFields>({ mode: 'onSubmit' });

  // Custom hook that submits the form.
  const { isPending, mutate }: HandleRegistrationForm = useSubmitRegistrationForm(setError, showModal);

  if (isInstitutionLoading || isRoleLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isInstitutionLoading || isRoleLoading}
        loadingText={constants.ui.messages.PAGE_LOADING}
      />
    );
  }

  if (isInstitutionError || isRoleError) {
    return (
      <GlobalErrorModal
        isVisible={isInstitutionError || isRoleError}
        onCloseModal={() => selectForm(FormType.LOGIN)}
      />
    );
  }

  return (
    <section>
      <FormInstruction instructionText={constants.ui.form.INSTRUCTION} />
      <form
        id={'post-pending-account-registration-form'}
        method={'POST'}
        onSubmit={handleSubmit((formData) => mutate(formData))}
      >
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.FIRST_NAME.REQUIRED,
            },
            pattern: {
              value: /^[\p{L}\s-]{2,100}$/u,
              message: constants.validation.FIRST_NAME.PATTERN,
            },
          }}
          type={'text'}
          id={'firstName'}
          label={constants.ui.form.fields.FIRST_NAME.LABEL}
          placeholder={constants.ui.form.fields.FIRST_NAME.PLACEHOLDER}
          isDisabled={isPending}
          error={errors.firstName?.message}
        />
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.LAST_NAME.REQUIRED,
            },
            pattern: {
              value: /^[\p{L}\s-]{2,100}$/u,
              message: constants.validation.LAST_NAME.PATTERN,
            },
          }}
          type={'text'}
          id={'lastName'}
          label={constants.ui.form.fields.LAST_NAME.LABEL}
          placeholder={constants.ui.form.fields.LAST_NAME.PLACEHOLDER}
          isDisabled={isPending}
          error={errors.lastName?.message}
        />
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.EMAIL.REQUIRED,
            },
          }}
          type={'email'}
          id={'email'}
          label={constants.ui.form.fields.EMAIL.LABEL}
          placeholder={constants.ui.form.fields.EMAIL.PLACEHOLDER}
          isDisabled={isPending}
          error={errors.email?.message}
        />
        <InstitutionDropdown
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.INSTITUTION.REQUIRED,
            },
          }}
          id={'institutionUuid'}
          options={institutions ?? []}
          isDisabled={isPending}
          error={errors.institutionUuid?.message}
        />
        <AccountRoleDropdown
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.ACCOUNT_ROLE.REQUIRED,
            },
          }}
          id={'accountRoleUuid'}
          options={roles ?? []}
          isDisabled={isPending}
          error={errors.accountRoleUuid?.message}
        />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={constants.ui.messages.FORM_LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              id={'register'}
              name={'register'}
              value={constants.ui.form.SUBMIT}
              disabled={isPending}
            />
          )}
          {errors.root && <InputError message={errors.root.message} />}
        </article>
      </form>
      <article>
        <FormSwapButton
          formType={FormType.RESET}
          buttonLabel={formTypeButtonLabel[FormType.RESET]}
          onFormSelect={selectForm}
          isDisabled={isPending}
        />
        <FormSwapButton
          formType={FormType.LOGIN}
          buttonLabel={formTypeButtonLabel[FormType.LOGIN]}
          onFormSelect={selectForm}
          isDisabled={isPending}
        />
      </article>
    </section>
  );
};
