import { useState } from 'react';

import {
  ForgottenPasswordForm,
  LoginForm,
  RegistrationForm,
} from './components';

import { FormTypeE } from './Home.types.ts';

const useShowConfirmationModal = () => {
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsConfirmationModalVisible(true);
  };

  const closeModal = () => {
    setIsConfirmationModalVisible(false);
  };

  return {
    isConfirmationModalVisible,
    showModal,
    closeModal,
  };
};

const useRenderSelectedFormComponent = (showModal: () => void) => {
  const [activeFormType, setActiveFormType] = useState<FormTypeE>(FormTypeE.LOGIN);

  const handleFormSelection = (formType: FormTypeE) => {
    setActiveFormType(formType);
  };

  const formComponents = {
    [FormTypeE.REGISTER]: <RegistrationForm formSelector={handleFormSelection} showModal={showModal} />,
    [FormTypeE.LOGIN]: <LoginForm formSelector={handleFormSelection} />,
    [FormTypeE.RESET]: <ForgottenPasswordForm formSelector={handleFormSelection} showModal={showModal} />,
  };

  const displayActiveFormType = formComponents[activeFormType];

  return {
    activeFormType,
    displayActiveFormType,
  };
};

export {
  useShowConfirmationModal,
  useRenderSelectedFormComponent,
};
