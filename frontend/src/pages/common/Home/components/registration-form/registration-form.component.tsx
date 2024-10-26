/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { useForm } from 'react-hook-form';

/* logic imports */
import { useGetInstitutionOptions } from '@hooks/institution';
import { useGetStudentAndMentorAccountRoles } from '@hooks/role';
import { RegistrationFormFields, SubmitRegistrationForm, useSubmitRegistrationForm } from './registration-form.hooks';

/* component, style imports */
import { AccountRoleDropdown, GenericInput, InputError, InstitutionDropdown, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { FormSwapButton } from '../form-swap-button/index';

/* configuration, utilities, constants imports */
import { formTypeButtonLabel } from '../../home.constants';
import { FormInstruction } from '../form-instruction/index';
import { constants } from './registration-form.constants';

/* interface, type, enum imports */
import { ListQueryResult } from '@common-types';
import { RoleOption } from '@services/role/role.service';
import { InstitutionOption } from '@services/support/institution.service';
import { ConfirmationModal, FormType, SelectForm, UseFormHook } from '../../home.interfaces';

/**
 * ===============
 * Component {@link RegistrationForm}
 * ===============
 */

/**
 * Defines the component's properties.
 *
 * @since 0.0.1
 */
type ComponentProps = SelectForm & ConfirmationModal;

/**
 * Renders a registration form that allows users to submit a form to get a pending account.
 * The component utilizes the `react-hook-form` library for form handling, including validation, and manages the form submission using the `react-query` library.
 * Additionally, users can switch to other forms, such as {@link LoginForm} or {@link ResetForm} using the {@link FormSwapButton} component.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const RegistrationForm = ({ selectForm, showModal }: ComponentProps): JSX.Element => {
  const {
    data: institutions,
    isLoading: isInstitutionLoading,
    isError: isInstitutionError,
  }: ListQueryResult<InstitutionOption> = useGetInstitutionOptions();
  const { data: roles, isLoading: isRoleLoading, isError: isRoleError }: ListQueryResult<RoleOption> = useGetStudentAndMentorAccountRoles();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  }: UseFormHook<RegistrationFormFields> = useForm<RegistrationFormFields>({ mode: 'onSubmit' });
  const { isPending, mutate }: SubmitRegistrationForm = useSubmitRegistrationForm(setError, showModal);

  if (isInstitutionLoading || isRoleLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isInstitutionLoading || isRoleLoading}
        loadingText={constants.pageMessage.LOADING}
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
      <FormInstruction instructionText={constants.uiMessage.FORM_INSTRUCTION} />
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
              message: constants.validation.FIRST_NAME_REQUIRED,
            },
            pattern: {
              value: /^[\p{L}\s]{2,100}$/u,
              message: constants.validation.FIRST_NAME_PATTERN,
            },
          }}
          type={'text'}
          id={'firstName'}
          label={constants.form.FIRST_NAME_LABEL}
          placeholder={constants.form.FIRST_NAME_PLACEHOLDER}
          isDisabled={isPending}
          error={errors.firstName?.message}
        />
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.LAST_NAME_REQUIRED,
            },
            pattern: {
              value: /^[\p{L}\s]{2,100}$/u,
              message: constants.validation.LAST_NAME_PATTERN,
            },
          }}
          type={'text'}
          id={'lastName'}
          label={constants.form.LAST_NAME_LABEL}
          placeholder={constants.form.LAST_NAME_PLACEHOLDER}
          isDisabled={isPending}
          error={errors.lastName?.message}
        />
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.EMAIL_REQUIRED,
            },
          }}
          type={'email'}
          id={'email'}
          label={constants.form.EMAIL_LABEL}
          placeholder={constants.form.EMAIL_PLACEHOLDER}
          isDisabled={isPending}
          error={errors.email?.message}
        />
        <InstitutionDropdown
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.INSTITUTION_REQUIRED,
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
              message: constants.validation.ACCOUNT_ROLE_REQUIRED,
            },
          }}
          id={'accountRoleUuid'}
          options={roles ?? []}
          isDisabled={isPending}
          error={errors.accountRoleUuid?.message}
        />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={constants.uiMessage.LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              id={'register'}
              name={'register'}
              value={constants.form.SUBMIT}
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
