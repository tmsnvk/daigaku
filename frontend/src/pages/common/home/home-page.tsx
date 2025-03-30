/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

/* logic imports */
import { AuthStatus, useAuthContext } from '@context/auth';
import { useModalControl } from '@hooks';
import { useFormSwitcher } from './hooks';

/* component imports */
import { ConfirmationModal } from '@components/notification';

/* configuration, utilities, constants imports */
import { confirmationModalFeedback } from './constants';

/**
 * Renders the application's root page.
 * If the user is authenticated, they are redirected to the `/dashboard` route.
 * Otherwise, the component renders one of three possible form components based on the user's selection.
 * A {@link ConfirmationModal} component is displayed when {@link isModalVisible} is true,
 * with a message corresponding to the current {@link selectedFormType}.
 *
 * @return {JSX.Element}
 */
export const Home = (): JSX.Element => {
  const { authStatus } = useAuthContext();
  const { isModalVisible, showModal, closeModal } = useModalControl();
  const { selectedFormType, selectedFormComponent } = useFormSwitcher(showModal);

  if (authStatus === AuthStatus.SIGNED_IN) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    <main className={'mx-auto flex flex-col items-center'}>
      {selectedFormComponent}
      {isModalVisible && (
        <ConfirmationModal
          isVisible={isModalVisible}
          message={confirmationModalFeedback[selectedFormType]}
          onCloseModal={closeModal}
        />
      )}
    </main>
  );
};
