/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useMemo, useState } from 'react';
import { match } from 'ts-pattern';

/* component imports */
import { LoginForm } from '../../login-form';
import { PendingAccountRegistrationForm } from '../../pending-account-registration-form';
import { ResetAccountPasswordForm } from '../../reset-account-password-form';

/* interface, type, enum imports */
import { FormType } from '../types.ts';

/**
 * Defines the return values for the {@link useFormSwitcher} hook.
 */
interface FormSwitcher {
  /**
   * The currently selected {@link FormType}.
   */
  readonly selectedFormType: FormType;

  /**
   * The currently rendered component.
   */
  readonly selectedFormComponent: JSX.Element | null;
}

const DEFAULT_LOADED_FORM_TYPE = FormType.LOGIN;

/**
 * A helper method used by {@link useFormSwitcher} to retrieve the appropriate form component based on the provided
 * {@link FormType}.
 *
 * @param selectedFormType The current {@link FormType} that determines which component is rendered.
 * @param selectFormType The method to change the rendered form component.
 * @return {JSX.Element} The form component corresponding to the selected {@link FormType}.
 */
const getSelectedFormComponent = (
  selectedFormType: FormType,
  selectFormType: (formType: FormType) => void,
): JSX.Element | null => {
  return match(selectedFormType)
    .with(FormType.LOGIN, () => <LoginForm onFormSelect={selectFormType} />)
    .with(FormType.REGISTER_PENDING_ACCOUNT, () => <PendingAccountRegistrationForm onFormSelect={selectFormType} />)
    .with(FormType.RESET_ACCOUNT_PASSWORD, () => <ResetAccountPasswordForm onFormSelect={selectFormType} />)
    .otherwise(() => null);
};

/**
 * Selects and renders a form component based on the active {@link FormType}.
 * The form component options are:
 * - {@link PendingAccountRegistrationForm}
 * - {@link LoginForm}
 * - {@link ResetAccountPasswordForm}
 *
 * @return {FormSwitcher}
 */
export const useFormSwitcher = (): FormSwitcher => {
  const [selectedFormType, setSelectedFormType] = useState<FormType>(DEFAULT_LOADED_FORM_TYPE);

  const selectFormType = (formType: FormType): void => {
    setSelectedFormType(formType);
  };

  const selectedFormComponent = useMemo((): JSX.Element | null => {
    return getSelectedFormComponent(selectedFormType, selectFormType);
  }, [selectedFormType]);

  return {
    selectedFormType,
    selectedFormComponent,
  };
};
