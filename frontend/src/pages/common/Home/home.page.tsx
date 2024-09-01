/**
 * @prettier
 */

/* external imports */
import { Navigate } from 'react-router-dom';

/* logic imports */
import { AuthContext, AuthStatus, useAuth } from '@context/auth';
import { ActiveFormComponent, ConfirmationModalControls, useActiveFormComponent, useConfirmationModal } from './home.hooks';

/* component, style imports */
import { ConfirmationModal } from '@components/notification';
import { MainContainer } from './home.styles';

/* utilities imports */
import { confirmationModalMessages } from './home.utilities';

/*
 * component - TODO - add functionality description
 */
export const Home = () => {
  const { authStatus }: Partial<AuthContext> = useAuth();
  const { isModalVisible, showModal, closeModal }: ConfirmationModalControls = useConfirmationModal();
  const { activeFormType, activeFormComponent }: ActiveFormComponent = useActiveFormComponent({ showModal });

  if (authStatus === AuthStatus.SIGNED_IN) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    authStatus === AuthStatus.SIGNED_OUT && (
      <MainContainer>
        {activeFormComponent}
        {isModalVisible && (
          <ConfirmationModal
            isVisible={isModalVisible}
            message={confirmationModalMessages[activeFormType]}
            closeModal={closeModal}
          />
        )}
      </MainContainer>
    )
  );
};
