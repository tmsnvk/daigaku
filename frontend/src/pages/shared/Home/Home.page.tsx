import { Navigate } from 'react-router-dom';
import {
  AuthStatusE,
  useAuth,
} from '@context/AuthContext.tsx';
import {
  useRenderSelectedFormComponent,
  useShowConfirmationModal,
} from './Home.hooks.tsx';
import { ConfirmationModal } from '@components/shared/notification';
import { MainContainer } from './Home.styles.ts';
import { confirmationModalMessages } from './Home.utilities.ts';

const HomePage = () => {
  const { authStatus } = useAuth();

  const { isConfirmationModalVisible, showModal, closeModal } = useShowConfirmationModal();
  const { activeFormType, displayActiveFormType } = useRenderSelectedFormComponent(showModal);

  if (authStatus === AuthStatusE.SIGNED_IN) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    authStatus === AuthStatusE.SIGNED_OUT &&
    <MainContainer>
      {displayActiveFormType}
      {
        isConfirmationModalVisible &&
        <ConfirmationModal
          isVisible={isConfirmationModalVisible}
          message={confirmationModalMessages[activeFormType]}
          closeModal={closeModal}
        />
      }
    </MainContainer>
  );
};

export default HomePage;
