import { useState } from 'react';

import {
  ForgottenPasswordForm,
  LoginForm,
  RegistrationForm,
} from './components/index';

import { FormType } from './home.types';

export interface ShowConfirmationModal {
  isConfirmationModalVisible: boolean;
  showModal: () => void;
  closeModal: () => void;
}

const useShowConfirmationModal = (): ShowConfirmationModal => {
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);

  const showModal = (): void => {
    setIsConfirmationModalVisible(true);
  };

  const closeModal = (): void => {
    setIsConfirmationModalVisible(false);
  };

  return {
    isConfirmationModalVisible,
    showModal,
    closeModal,
  };
};

export interface RenderSelectedFormComponent {
  activeFormType: FormType;
  displayActiveFormType: JSX.Element;
}

const useRenderSelectedFormComponent = (showModal: () => void): RenderSelectedFormComponent => {
  const [activeFormType, setActiveFormType] = useState<FormType>(FormType.LOGIN);

  const handleFormSelection = (formType: FormType): void => {
    setActiveFormType(formType);
  };

  const formComponents: Record<FormType, JSX.Element> = {
    [FormType.REGISTER]: <RegistrationForm formSelector={handleFormSelection} showModal={showModal} />,
    [FormType.LOGIN]: <LoginForm formSelector={handleFormSelection} />,
    [FormType.RESET]: <ForgottenPasswordForm formSelector={handleFormSelection} showModal={showModal} />,
  };

  const displayActiveFormType: JSX.Element = formComponents[activeFormType];

  return {
    activeFormType,
    displayActiveFormType,
  };
};

export {
  useShowConfirmationModal,
  useRenderSelectedFormComponent,
};
