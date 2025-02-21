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
import { useActiveFormComponent } from './home.hooks';

/* component, style imports */
import { ConfirmationModal } from '@components/notification';

/* configuration, utilities, constants imports */
import { confirmationModalFeedback } from './home.constants';

/**
 * Renders the root page of the application.
 * If the user is authenticated, they are redirected to the `/dashboard` route.
 * Otherwise, the component renders one of three possible form components based on the user's selection.
 * A {@link ConfirmationModal} component is displayed when the `isModalVisible` state is true,
 * with a message corresponding to the current `activeFormType`.
 *
 * @return {JSX.Element}
 */
export const Home = (): JSX.Element => {
  const { authStatus } = useAuthContext();
  const { isModalVisible, showModal, closeModal } = useModalControl();
  const { activeFormType, activeFormComponent } = useActiveFormComponent(showModal);

  if (authStatus === AuthStatus.SIGNED_IN) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    <main className={'@container/main flex flex-col items-center'}>
      {/* <Main> */}
      {activeFormComponent}
      {isModalVisible && (
        <ConfirmationModal
          isVisible={isModalVisible}
          message={confirmationModalFeedback[activeFormType]}
          onCloseModal={closeModal}
        />
      )}
    </main>
  );
};
