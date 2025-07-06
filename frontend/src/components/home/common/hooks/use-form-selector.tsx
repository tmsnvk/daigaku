/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useMemo, useState } from 'react';
import { match } from 'ts-pattern';

/* component imports */
import { LoginForm } from '../../login-form/index.ts';
import { PendingAccountRegistrationForm } from '../../pending-account-registration-form/index.ts';
import { ResetAccountPasswordForm } from '../../reset-account-password-form/index.ts';

/* interface, type imports */
import { FormType, FormTypes } from '../types.ts';

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
 * Selects and renders a form component based on the active {@link FormType}.
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
      .with(FormTypes.RESET_ACCOUNT_PASSWORD, () => <ResetAccountPasswordForm onFormSelect={selectFormType} />)
      .exhaustive();
  }, [selectedFormType]);

  return {
    selectedFormType,
    selectedFormComponent,
  };
};
