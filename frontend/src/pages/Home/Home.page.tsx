import { useState } from 'react';
import {
  ForgottenPasswordForm,
  LoginForm,
  RegisterForm,
} from '@components/page/home';
import { MainContainer } from './Home.styles.ts';
import { FormTypeT } from '@pages/Home/Home.types.ts';

const HomePage = () => {
  const [activeFormType, setActiveFormType] = useState<FormTypeT>(FormTypeT.Register);

  const handleFormSelectionOnClick = (formType: FormTypeT) => {
    setActiveFormType(formType);
  };

  const renderFormComponent = () => {
    if (activeFormType === FormTypeT.Login) {
      return <LoginForm clickHandler={handleFormSelectionOnClick} />;
    }

    if (activeFormType === FormTypeT.Register) {
      return <RegisterForm clickHandler={handleFormSelectionOnClick} />;
    }

    if (activeFormType === FormTypeT.Reset) {
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
