/**
 * @prettier
 */

/* external imports */
import { Navigate } from 'react-router-dom';

/* logic imports */
import { AuthStatus, useAuth } from '@context/auth';
import { RenderSelectedFormComponent, ShowConfirmationModal, useRenderSelectedFormComponent, useShowConfirmationModal } from './home.hooks';

/* component, style imports */
import { ConfirmationModal } from '@components/notification';
import { MainContainer } from './home.styles';

/* utilities imports */
import { confirmationModalMessages } from './home.utilities';

/*
 * component - TODO - add functionality description
 */
export const Home = () => {
  const { authStatus } = useAuth();
  const { isConfirmationModalVisible, showModal, closeModal }: ShowConfirmationModal = useShowConfirmationModal();
  const { activeFormType, displayActiveFormType }: RenderSelectedFormComponent = useRenderSelectedFormComponent(showModal);

  if (authStatus === AuthStatus.SIGNED_IN) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    authStatus === AuthStatus.SIGNED_OUT && (
      <MainContainer>
        {displayActiveFormType}
        {isConfirmationModalVisible && (
          <ConfirmationModal
            isVisible={isConfirmationModalVisible}
            message={confirmationModalMessages[activeFormType]}
            closeModal={closeModal}
          />
        )}
      </MainContainer>
    )
  );
};
