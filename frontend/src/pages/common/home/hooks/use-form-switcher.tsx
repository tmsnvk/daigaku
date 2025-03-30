/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useMemo, useState } from 'react';
import { match } from 'ts-pattern';

/* component imports */
import { LoginForm, RegistrationForm, ResetForm } from '../components';

/* configuration, utilities, constants imports */
import { joinTw } from '@utilities';

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
  readonly selectedFormComponent: JSX.Element;
}

/**
 * A helper method used by {@link useFormSwitcher} to retrieve the appropriate form component based on the provided {@link FormType}.
 *
 * @param selectedFormType The current {@link FormType} that determines which component is rendered.
 * @param selectFormTypeHandler The method to change the rendered form component.
 * @param showModal The method to trigger a modal component attached to the currently active form component.
 * @return {JSX.Element} The form component corresponding to the selected {@link FormType}.
 */
const getSelectedFormComponent = (
  selectedFormType: FormType,
  selectFormTypeHandler: (formType: FormType) => void,
  showModal: () => void,
): JSX.Element | null => {
  return match([selectedFormType])
    .with([FormType.LOGIN], () => <LoginForm onFormSelect={selectFormTypeHandler} />)
    .with([FormType.REGISTER], () => (
      <RegistrationForm
        onFormSelect={selectFormTypeHandler}
        showModal={showModal}
      />
    ))
    .with([FormType.RESET], () => (
      <ResetForm
        onFormSelect={selectFormTypeHandler}
        showModal={showModal}
      />
    ))
    .otherwise(() => null);
};

/**
 * Selects and renders a form component based on the active {@link FormType}.
 * The form component options are:
 * - {@link RegistrationForm}
 * - {@link LoginForm}
 * - {@link ResetForm}
 *
 * @param showModal The method to trigger a modal component attached to the currently active form component.
 * @return {FormSwitcher}
 */
export const useFormSwitcher = (showModal: () => void): FormSwitcher => {
  const DEFAULT_LOADED_FORM_TYPE = FormType.LOGIN;
  const [selectedFormType, setSelectedFormType] = useState<FormType>(DEFAULT_LOADED_FORM_TYPE);

  const selectFormTypeHandler = (formType: FormType): void => {
    setSelectedFormType(formType);
  };

  const selectedFormComponent: JSX.Element = useMemo(() => {
    return (
      <section
        key={selectedFormType}
        className={joinTw(
          'base-tertiary-border animate-fade-in-from-left sm:w-200 my-[5%] flex w-[85%] flex-col justify-between px-10 py-20 text-center',
        )}
      >
        {getSelectedFormComponent(selectedFormType, selectFormTypeHandler, showModal)}
      </section>
    );
  }, [selectedFormType]);

  return {
    selectedFormType,
    selectedFormComponent,
  };
};
