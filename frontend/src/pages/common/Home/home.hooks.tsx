/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { useState } from 'react';

/* component, style imports */
import { LoginForm, RegistrationForm, ResetForm } from './components/index';

/* interface, type, enum imports */
import { FormType } from './home.types';

/**
 * ===============
 * Custom Hook {@link useConfirmationModal}
 * ===============
 */

/* interfaces, types, enums */
export interface ConfirmationModalControl {
  isModalVisible: boolean;
  showModal: () => void;
  closeModal: () => void;
}

/**
 * @description
 * A custom hook that manages the display of a {@link ConfirmationModal} component.
 *
 * @returns {ConfirmationModalControl} An object containing the following:
 * - `isModalVisible` (boolean) - The current visibility state of the modal.
 * - `showModal` (function) - A function to set the modal as visible.
 * - `closeModal` (function) - A function to hide the modal.
 *
 * @since 0.0.1
 */
export const useConfirmationModal = (): ConfirmationModalControl => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const closeModal = (): void => {
    setIsModalVisible(false);
  };

  return {
    isModalVisible,
    showModal,
    closeModal,
  };
};

/**
 * ===============
 * Helper Method {@link getFormComponent}
 * ===============
 */

/* interfaces, types, enums */
interface GetFormComponentParams {
  activeFormType: FormType;
  selectFormType: (formType: FormType) => void;
  showModal: () => void;
}

/**
 * @description
 * A helper method used by {@link useActiveFormComponent} that retrieves
 * the appropriate form component based on the provided {@link FormType}.
 *
 * @param {FormType} params.activeFormType - The current {@link FormType} to determine which component to render.
 * @param {(formType: FormType) => void} params.selectFormType - A function to change the form type.
 * @param {() => void} params.showModal - A function to trigger the modal display.
 *
 * @returns {JSX.Element} The form component corresponding to the current {@link FormType}.
 *
 * @since 0.0.1
 */
const getFormComponent = ({ activeFormType, selectFormType, showModal }: GetFormComponentParams): JSX.Element => {
  switch (activeFormType) {
    case FormType.REGISTER:
      return (
        <RegistrationForm
          formSelector={selectFormType}
          showModal={showModal}
        />
      );

    case FormType.RESET:
      return (
        <ResetForm
          formSelector={selectFormType}
          showModal={showModal}
        />
      );

    default:
      return <LoginForm formSelector={selectFormType} />;
  }
};

/**
 * ===============
 * Custom Hook {@link useActiveFormComponent}
 * ===============
 */

/* interfaces, types, enums */
interface ActiveFormComponentParams {
  showModal: () => void;
}

export interface ActiveFormComponent {
  activeFormType: FormType;
  activeFormComponent: JSX.Element;
}

/**
 * @description
 * A custom hook that manages the state of the currently active {@link FormType} form component. These are:
 * - {@link RegistrationForm}
 * - {@link LoginForm}
 * - {@link ResetForm}
 *
 * @param {() => void} showModal - A function to show the modal, used in form components.
 *
 * @returns {ActiveFormComponent} An object containing the following:
 * - `activeFormType` (useState) - The currently selected {@link FormType}.
 * - `activeFormComponent` (JSX.Element) - The JSX element of the currently active form component.
 *
 * @since 0.0.1
 */
export const useActiveFormComponent = ({ showModal }: ActiveFormComponentParams): ActiveFormComponent => {
  const [activeFormType, setActiveFormType] = useState<FormType>(FormType.LOGIN);

  const selectFormType = (formType: FormType): void => {
    setActiveFormType(formType);
  };

  const activeFormComponent: JSX.Element = getFormComponent({ activeFormType, selectFormType, showModal });

  return {
    activeFormType,
    activeFormComponent,
  };
};
