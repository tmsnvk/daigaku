import { useState } from 'react';
import {
  ForgottenPasswordForm,
  LoginForm,
  RegisterForm,
} from '@components/page/home/index.ts';
import { MainContainer } from './Home.styles.ts';
import { FormType } from '@pages/Home/Home.types.ts';

const HomePage = () => {
  const [activeFormType, setActiveFormType] = useState<FormType>(FormType.Login);

  const handleFormSelectionOnClick = (formType: FormType) => {
    setActiveFormType(formType);
  };

  const renderFormComponent = () => {
    if (activeFormType === FormType.Login) {
      return <LoginForm clickHandler={handleFormSelectionOnClick} />;
    }

    if (activeFormType === FormType.Register) {
      return <RegisterForm clickHandler={handleFormSelectionOnClick} />;
    }

    if (activeFormType === FormType.Reset) {
      return <ForgottenPasswordForm clickHandler={handleFormSelectionOnClick} />;
    }
  };

  return (
    <MainContainer>
      {renderFormComponent()}
    </MainContainer>
  );
};

export default HomePage;
