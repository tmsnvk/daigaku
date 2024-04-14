import { useState } from 'react';
import {
  ForgottenPasswordForm,
  LoginForm,
  RegisterForm,
} from '@components/page/home';
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
    [FormTypeE.REGISTER]: <RegisterForm formSelector={handleFormSelection} showModal={showModal} />,
    [FormTypeE.LOGIN]: <LoginForm formSelector={handleFormSelection} />,
    [FormTypeE.RESET]: <ForgottenPasswordForm formSelector={handleFormSelection} showModal={showModal} />,
  };

  return {
    activeFormType,
    formComponents,
  };
};

export {
  useShowConfirmationModal,
  useRenderSelectedFormComponent,
};
