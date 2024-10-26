/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { Navigate } from 'react-router-dom';

/* logic imports */
import { AuthContext, AuthStatus, useAuth } from '@context/auth';
import { useModalControl } from '@hooks/index';
import { ActiveFormComponent, useActiveFormComponent } from './home.hooks';

/* component, style imports */
import { ConfirmationModal } from '@components/notification';
import { Main } from './home.styles';

/* configuration, utilities, constants imports */
import { confirmationModalFeedback } from './home.constants';

/* interface, type, enum imports */
import { ModalControl } from '@hooks/modal-components/use-modal-control';

/**
 * ===============
 * Component {@link Home}
 * ===============
 */

/**
 * Renders the root page of the application.
 * If the user is signed in, they are redirected to the `/dashboard` route. Otherwise, it renders one of three possible form components based on the user's selection.
 * A {@link ConfirmationModal} component is displayed when the `isModalVisible` state is true, with a message corresponding to the current `activeFormType`.
 *
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const Home = (): JSX.Element => {
  // Authentication context.
  const { authStatus }: Partial<AuthContext> = useAuth();

  // Custom hook that handles the post-submit modal visibility.
  const { isModalVisible, showModal, closeModal }: ModalControl = useModalControl();

  // Custom hook that manages which form should be displayed.
  const { activeFormType, activeFormComponent }: ActiveFormComponent = useActiveFormComponent(showModal);

  if (authStatus === AuthStatus.SIGNED_IN) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    <Main>
      {activeFormComponent}
      {isModalVisible && (
        <ConfirmationModal
          isVisible={isModalVisible}
          message={confirmationModalFeedback[activeFormType]}
          onCloseModal={closeModal}
        />
      )}
    </Main>
  );
};
