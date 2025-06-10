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

/* interface, type imports */
import { FormTypes } from '../types.ts';

/**
 * Defines the return values for the {@link useFormSwitcher} hook.
 */
interface FormSwitcher {
  /**
   * The currently selected {@link FormTypes}.
   */
  readonly selectedFormType: FormTypes;

  /**
   * The currently rendered component.
   */
  readonly selectedFormComponent: JSX.Element | null;
}

/**
 * A helper method used by {@link useFormSwitcher} to retrieve the appropriate form component based on the provided
 * {@link FormTypes}.
 *
 * @param selectedFormType The current {@link FormTypes} that determines which component is rendered.
 * @param selectFormType The method to change the rendered form component.
 * @return {JSX.Element} The form component corresponding to the selected {@link FormTypes}.
 */
const getSelectedFormComponent = (
  selectedFormType: FormTypes,
  selectFormType: (formType: FormTypes) => void,
): JSX.Element => {
  return match(selectedFormType)
    .with(FormTypes.LOGIN, () => <LoginForm onFormSelect={selectFormType} />)
    .with(FormTypes.REGISTER_PENDING_ACCOUNT, () => <PendingAccountRegistrationForm onFormSelect={selectFormType} />)
    .with(FormTypes.RESET_ACCOUNT_PASSWORD, () => <ResetAccountPasswordForm onFormSelect={selectFormType} />)
    .exhaustive();
};

const DEFAULT_LOADED_FORM_TYPE = FormTypes.LOGIN;

/**
 * Selects and renders a form component based on the active {@link FormTypes}.
 * The form component options are:
 * - {@link PendingAccountRegistrationForm}
 * - {@link LoginForm}
 * - {@link ResetAccountPasswordForm}
 *
 * @return {FormSwitcher}
 */
export const useFormSwitcher = (): FormSwitcher => {
  const [selectedFormType, setSelectedFormType] = useState<FormTypes>(DEFAULT_LOADED_FORM_TYPE);

  const selectFormType = (formType: FormTypes): void => {
    setSelectedFormType(formType);
  };

  const selectedFormComponent = useMemo((): JSX.Element => {
    return getSelectedFormComponent(selectedFormType, selectFormType);
  }, [selectedFormType]);

  return {
    selectedFormType,
    selectedFormComponent,
  };
};
