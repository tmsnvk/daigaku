/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useMemo, useState } from 'react';
import { match } from 'ts-pattern';

/* component imports */
import { LoginForm, RegisterPendingAccountForm, ResetAccountPasswordForm } from '../components';

/* interface, type, enum imports */
import { FormType } from '../models';

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
 * @param showModal The method to trigger a modal component attached to the currently active form component.
 * @return {JSX.Element} The form component corresponding to the selected {@link FormType}.
 */
const getSelectedFormComponent = (
  selectedFormType: FormType,
  selectFormType: (formType: FormType) => void,
  showModal: () => void,
): JSX.Element | null => {
  return match(selectedFormType)
    .with(FormType.LOGIN, () => <LoginForm onFormSelect={selectFormType} />)
    .with(FormType.REGISTER_PENDING_ACCOUNT, () => (
      <RegisterPendingAccountForm
        onFormSelect={selectFormType}
        showModal={showModal}
      />
    ))
    .with(FormType.RESET_ACCOUNT_PASSWORD, () => (
      <ResetAccountPasswordForm
        onFormSelect={selectFormType}
        showModal={showModal}
      />
    ))
    .otherwise(() => null);
};

/**
 * Selects and renders a form component based on the active {@link FormType}.
 * The form component options are:
 * - {@link RegisterPendingAccountForm}
 * - {@link LoginForm}
 * - {@link ResetAccountPasswordForm}
 *
 * @param showModal The method to trigger a modal component attached to the currently active form component.
 * @return {FormSwitcher}
 */
export const useFormSwitcher = (showModal: () => void): FormSwitcher => {
  const [selectedFormType, setSelectedFormType] = useState<FormType>(DEFAULT_LOADED_FORM_TYPE);

  const selectFormType = (formType: FormType): void => {
    setSelectedFormType(formType);
  };

  const selectedFormComponent = useMemo((): JSX.Element | null => {
    return getSelectedFormComponent(selectedFormType, selectFormType, showModal);
  }, [selectedFormType]);

  return {
    selectedFormType,
    selectedFormComponent,
  };
};
