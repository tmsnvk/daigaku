/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useState } from 'react';

/* component imports */
import { LoginForm, RegistrationForm, ResetForm } from './components';

/* interface, type, enum imports */
import { ActiveFormComponent, FormType } from './home.models';

/**
 * A helper method used by {@link useActiveFormComponent}
 * that retrieves the appropriate form component based on the provided {@link FormType}.
 *
 * @param activeFormType The current {@link FormType} that determines which component should be rendered.
 * @param selectFormType The method to change the displayed form component.
 * @param showModal The method to trigger the displayed modal component.
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
 * Manages the currently active {@link FormType} form component's state. These are:
 * - {@link RegistrationForm}
 * - {@link LoginForm}
 * - {@link ResetForm}
 *
 * @param showModal The method to show a confirmation modal component.
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
