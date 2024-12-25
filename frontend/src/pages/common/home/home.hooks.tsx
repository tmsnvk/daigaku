/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useState } from 'react';

/* component, style imports */
import { LoginForm, RegistrationForm, ResetForm } from './components';

/* interface, type, enum imports */
import { ActiveFormComponent, ConfirmationModal, FormType } from './home.models';

/**
 * A helper method used by {@link useActiveFormComponent}
 * that retrieves the appropriate form component based on the provided {@link FormType}.
 *
 * @param activeFormType The current {@link FormType} to determine which component to render.
 * @param selectFormType A function to change the form type.
 * @param showModal A function to trigger the modal display.
 * @return {JSX.Element} The form component corresponding to the selected {@link FormType}.
 */
const getFormComponent = (
  activeFormType: FormType,
  selectFormType: (formType: FormType) => void,
  showModal: ConfirmationModal['showModal'],
): JSX.Element => {
  switch (activeFormType) {
    case FormType.REGISTER:
      return (
        <RegistrationForm
          selectForm={selectFormType}
          showModal={showModal}
        />
      );

    case FormType.RESET:
      return (
        <ResetForm
          selectForm={selectFormType}
          showModal={showModal}
        />
      );

    default:
      return <LoginForm selectForm={selectFormType} />;
  }
};

/**
 * Manages the currently active {@link FormType} form component's state. These are:
 * - {@link RegistrationForm}
 * - {@link LoginForm}
 * - {@link ResetForm}
 *
 * @param showModal A function to show the {@link ConfirmationModal}, used in form components.
 * @return {ActiveFormComponent}
 */
export const useActiveFormComponent = (showModal: ConfirmationModal['showModal']): ActiveFormComponent => {
  const [activeFormType, setActiveFormType] = useState<FormType>(FormType.LOGIN);

  const selectFormType = (formType: FormType): void => {
    setActiveFormType(formType);
  };

  const activeFormComponent: JSX.Element = getFormComponent(activeFormType, selectFormType, showModal);

  return {
    activeFormType,
    activeFormComponent,
  };
};
