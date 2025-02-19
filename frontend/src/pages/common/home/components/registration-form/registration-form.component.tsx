/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useGetInstitutionOptions, useGetStudentAndMentorAccountRoles } from '@hooks';
import { useSubmitRegistrationForm } from './registration-form.hooks';

/* component, style imports */
import { AccountRoleDropdown, GenericInput, InputError, InstitutionDropdown, SubmitInput } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { GlobalErrorModal, GlobalLoadingModal } from '@components/notification';
import { FormInstruction } from '../form-instruction';
import { FormSwapButton } from '../form-swap-button';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';
import { formTypeButtonLabel } from '../../home.constants';

/* interface, type, enum imports */
import { PendingAccountRegisterRequest } from '@common-types';
import { FormType } from '../../home.models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
  /**
   * A function to select the current form type.
   *
   * @param formType The type of the form to be selected.
   */
  selectForm: (formType: FormType) => void;

  /**
   * A function to show a modal.
   */
  showModal: () => void;
}

/**
 * Renders a registration form component that allows users to submit a form to register a pending account.
 * The component utilizes the `react-hook-form` and `react-query` libraries for managing the form submission.
 * Additionally, users can switch to other forms on the page using the {@link FormSwapButton} component.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const RegistrationForm = ({ selectForm, showModal }: ComponentProps): JSX.Element => {
  const { data: institutions, isLoading: isInstitutionLoading, isError: isInstitutionError } = useGetInstitutionOptions();
  const { data: roles, isLoading: isRoleLoading, isError: isRoleError } = useGetStudentAndMentorAccountRoles();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<PendingAccountRegisterRequest>({ mode: 'onSubmit' });
  const { isPending, mutate } = useSubmitRegistrationForm(setError, showModal);

  if (isInstitutionLoading || isRoleLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isInstitutionLoading || isRoleLoading}
        loadingText={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.MESSAGES.PAGE_LOADING}
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
      <FormInstruction instructionText={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.INSTRUCTION} />
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
              message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.VALIDATION.REQUIRED,
            },
            pattern: {
              value: /^[\p{L}\s-]{2,100}$/u,
              message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.VALIDATION.PATTERN,
            },
          }}
          type={'text'}
          id={'firstName'}
          label={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.LABEL}
          placeholder={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.FIRST_NAME.PLACEHOLDER}
          isDisabled={isPending}
          error={errors.firstName?.message}
        />
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.VALIDATION.REQUIRED,
            },
            pattern: {
              value: /^[\p{L}\s-]{2,100}$/u,
              message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.VALIDATION.PATTERN,
            },
          }}
          type={'text'}
          id={'lastName'}
          label={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.LABEL}
          placeholder={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.LAST_NAME.PLACEHOLDER}
          isDisabled={isPending}
          error={errors.lastName?.message}
        />
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.EMAIL.VALIDATION.REQUIRED,
            },
          }}
          type={'email'}
          id={'email'}
          label={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.EMAIL.LABEL}
          placeholder={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.EMAIL.PLACEHOLDER}
          isDisabled={isPending}
          error={errors.email?.message}
        />
        <InstitutionDropdown
          register={register}
          validationRules={{
            required: {
              value: true,
              message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.INSTITUTION.VALIDATION.REQUIRED,
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
              message: l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.ACCOUNT_ROLE.VALIDATION.REQUIRED,
            },
          }}
          id={'accountRoleUuid'}
          options={roles ?? []}
          isDisabled={isPending}
          error={errors.accountRoleUuid?.message}
        />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.MESSAGES.FORM_LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              id={'register'}
              name={'register'}
              value={l.PAGES.COMMON.HOME.PENDING_ACCOUNT_REGISTRATION.FORM.SUBMIT}
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
