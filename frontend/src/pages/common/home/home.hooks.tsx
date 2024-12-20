/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { JSX, useState } from 'react';

/* component, style imports */
import { LoginForm, RegistrationForm, ResetForm } from './components/index';

/* interface, type, enum imports */
import { ConfirmationModal, FormType } from './home.interfaces';

/**
 * ===============
 * Helper Method {@link getFormComponent}
 * ===============
 */

/**
 * A helper method used by {@link useActiveFormComponent} that retrieves the appropriate form component based on the provided {@link FormType}.
 *
 * @param activeFormType The current {@link FormType} to determine which component to render.
 * @param selectFormType A function to change the form type.
 * @param showModal A function to trigger the modal display.
 * @return {JSX.Element} The form component corresponding to the selected {@link FormType}.
 *
 * @since 0.0.1
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
 * ===============
 * Custom Hook {@link useActiveFormComponent}
 * ===============
 */

/**
 * Defines the {@link useActiveFormComponent} custom hook's return value properties.
 *
 * @since 0.0.1
 */
export interface ActiveFormComponent {
  /**
   * The currently selected {@link FormType}.
   */
  activeFormType: FormType;

  /**
   * The currently active form component's JSX.Element.
   */
  activeFormComponent: JSX.Element;
}

/**
 * Manages the currently active {@link FormType} form component's state. These are:
 * - {@link RegistrationForm}
 * - {@link LoginForm}
 * - {@link ResetForm}
 *
 * @param showModal A function to show the {@link ConfirmationModal}, used in form components.
 * @return {ActiveFormComponent}
 *
 * @since 0.0.1
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
