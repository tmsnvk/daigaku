import { FormTypeE } from '@pages/Home/Home.types.ts';
import {
  ForgottenPasswordForm,
  LoginForm,
  RegisterForm,
} from '@components/page/home';
import { useState } from 'react';

const useShowConfirmationModal = () => {
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState<boolean>(false);

  const showConfirmationModalAfterSuccessFulSubmission = () => {
    setIsConfirmationModalVisible(true);
  };

  return {
    isConfirmationModalVisible,
    showConfirmationModalAfterSuccessFulSubmission,
  };
};

type RenderSelectedFormComponentT = {
  showConfirmationModalAfterSuccessFulSubmission: () => void;
}

const useRenderSelectedFormComponent = ({ showConfirmationModalAfterSuccessFulSubmission }: RenderSelectedFormComponentT) => {
  const [activeFormType, setActiveFormType] = useState<FormTypeE>(FormTypeE.Register);

  const handleFormSelectionOnClick = (formType: FormTypeE) => {
    setActiveFormType(formType);
  };

  const renderFormComponent = () => {
    if (activeFormType === FormTypeE.Register) {
      return <RegisterForm formSelector={handleFormSelectionOnClick} showModal={showConfirmationModalAfterSuccessFulSubmission} />;
    }

    if (activeFormType === FormTypeE.Login) {
      return <LoginForm formSelector={handleFormSelectionOnClick} />;
    }

    if (activeFormType === FormTypeE.Reset) {
      return <ForgottenPasswordForm formSelector={handleFormSelectionOnClick} showModal={showConfirmationModalAfterSuccessFulSubmission} />;
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
