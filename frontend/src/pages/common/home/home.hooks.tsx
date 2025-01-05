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
import { FormType } from './home.models';

/**
 * A helper method used by {@link useActiveFormComponent}
 * that retrieves the appropriate form component based on the provided {@link FormType}.
 *
 * @param activeFormType The current {@link FormType} to determine which component to render.
 * @param selectFormType A function to change the displayed form.
 * @param showModal A function to trigger the modal display.
 * @return {JSX.Element} The form component corresponding to the selected {@link FormType}.
 */
const getFormComponent = (activeFormType: FormType, selectFormType: (formType: FormType) => void, showModal: () => void): JSX.Element => {
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
 * Defines the structure for managing the state and rendering of an active component.
 */
interface ActiveFormComponent {
  /**
   * The currently selected {@link FormType}.
   */
  activeFormType: FormType;

  /**
   * The rendered element of the currently active component.
   */
  activeFormComponent: JSX.Element;
}

/**
 * Manages the currently active {@link FormType} form component's state. These are:
 * - {@link RegistrationForm}
 * - {@link LoginForm}
 * - {@link ResetForm}
 *
 * @param showModal A function to show a confirmation modal, used in form components.
 * @return {ActiveFormComponent}
 */
export const useActiveFormComponent = (showModal: () => void): ActiveFormComponent => {
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
