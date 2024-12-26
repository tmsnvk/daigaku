/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

/* logic imports */
import { AuthContext, AuthStatus, useAuth } from '@context/auth';
import { useModalControl } from '@hooks';
import { useActiveFormComponent } from './home.hooks';

/* component, style imports */
import { ConfirmationModal } from '@components/notification';
import { Main } from './home.styles';

/* configuration, utilities, constants imports */
import { confirmationModalFeedback } from './home.constants';

/* interface, type, enum imports */
import { ModalControl } from '@common-types';
import { ActiveFormComponent } from './home.models';

/**
 * Renders the root page of the application.
 * If the user is signed in, they are redirected to the `/dashboard` route.
 * Otherwise, it renders one of three possible form components based on the user's selection.
 * A {@link ConfirmationModal} component is displayed when the `isModalVisible` state is true,
 * with a message corresponding to the current `activeFormType`.
 *
 * @return {JSX.Element}
 */
export const Home = (): JSX.Element => {
  const { authStatus }: AuthContext = useAuth();
  const { isModalVisible, showModal, closeModal }: ModalControl = useModalControl();
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
