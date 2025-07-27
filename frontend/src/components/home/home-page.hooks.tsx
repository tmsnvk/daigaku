/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useMemo, useState } from 'react';
import { match } from 'ts-pattern';

/* component imports */
import { AccountPasswordResetForm } from './account-password-reset-form';
import { LoginForm } from './login-form';
import { PendingAccountRegistrationForm } from './pending-account-registration-form';

/* interface, type imports */
import { FormType, FormTypes } from './common/types';

/**
 * Defines the return values for the {@link useFormSelector} hook.
 */
interface FormSelector {
  /**
   * The currently selected {@link FormType}.
   */
  readonly selectedFormType: FormType;

  /**
   * The currently rendered component.
   */
  readonly selectedFormComponent: JSX.Element | null;
}

const DEFAULT_LOADED_FORM_TYPE = FormTypes.LOGIN;

/**
 * Selects and renders the form component based on the active {@link FormType}.
 *
 * @return {FormSelector}
 */
export const useFormSelector = (): FormSelector => {
  const [selectedFormType, setSelectedFormType] = useState<FormType>(DEFAULT_LOADED_FORM_TYPE);

  const selectFormType = (formType: FormType): void => {
    setSelectedFormType(formType);
  };

  const selectedFormComponent = useMemo((): JSX.Element => {
    return match(selectedFormType)
      .with(FormTypes.LOGIN, () => <LoginForm onFormSelect={selectFormType} />)
      .with(FormTypes.REGISTER_PENDING_ACCOUNT, () => <PendingAccountRegistrationForm onFormSelect={selectFormType} />)
      .with(FormTypes.RESET_ACCOUNT_PASSWORD, () => <AccountPasswordResetForm onFormSelect={selectFormType} />)
      .exhaustive();
  }, [selectedFormType]);

  return {
    selectedFormType,
    selectedFormComponent,
  };
};
