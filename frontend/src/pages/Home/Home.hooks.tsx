import { useState } from 'react';
import {
  ForgottenPasswordForm,
  LoginForm,
  RegisterForm,
} from '@components/page/home';
import { FormTypeE } from '@pages/Home/Home.types.ts';

const useShowConfirmationModal = () => {
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);

  const showModalAfterSuccessFulSubmission = () => {
    setIsConfirmationModalVisible(true);
  };

  const closeModal = () => {
    setIsConfirmationModalVisible(false);
  };

  return {
    isConfirmationModalVisible,
    showModalAfterSuccessFulSubmission,
    closeModal,
  };
};

type RenderSelectedFormComponentT = {
  showModalAfterSuccessFulSubmission: () => void;
}

const useRenderSelectedFormComponent = ({ showModalAfterSuccessFulSubmission }: RenderSelectedFormComponentT) => {
  const [activeFormType, setActiveFormType] = useState<FormTypeE>(FormTypeE.Register);

  const handleFormSelectionOnClick = (formType: FormTypeE) => {
    setActiveFormType(formType);
  };

  const renderFormComponent = () => {
    if (activeFormType === FormTypeE.Register) {
      return <RegisterForm formSelector={handleFormSelectionOnClick} showModal={showModalAfterSuccessFulSubmission} />;
    }

    if (activeFormType === FormTypeE.Login) {
      return <LoginForm formSelector={handleFormSelectionOnClick} />;
    }

    if (activeFormType === FormTypeE.Reset) {
      return <ForgottenPasswordForm formSelector={handleFormSelectionOnClick} showModal={showModalAfterSuccessFulSubmission} />;
    }
  };

  return {
    activeFormType,
    renderFormComponent,
  };
};

export {
  useShowConfirmationModal,
  useRenderSelectedFormComponent,
};
