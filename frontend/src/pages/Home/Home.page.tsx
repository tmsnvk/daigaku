import { useState } from 'react';
import {
  LoginForm,
  PasswordResetForm,
  RegisterForm,
} from '@components/page/home/index.ts';
import { MainContainer } from './Home.styles.ts';

const HomePage = () => {
  const [activeForm, setActiveForm] = useState('login');

  const handleFormSelectionOnClick = (formType: string) => {
    setActiveForm(formType);
  };

  const renderFormComponent = () => {
    if (activeForm === 'login') {
      return <LoginForm clickHandler={handleFormSelectionOnClick} />;
    }

    if (activeForm === 'register') {
      return <RegisterForm clickHandler={handleFormSelectionOnClick} />;
    }

    if (activeForm === 'reset') {
      return <PasswordResetForm clickHandler={handleFormSelectionOnClick} />;
    }
  };

  return (
    <MainContainer>
      {renderFormComponent()}
    </MainContainer>
  );
};

export default HomePage;
