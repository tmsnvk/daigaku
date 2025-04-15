/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { useModalControl } from '@daigaku/hooks';
import { useFormSwitcher } from './hooks';

/* component imports */
import { ConfirmationModal } from '@daigaku/components/notification';
import { FormSectionWrapper } from './components';

/* configuration, utilities, constants imports */
import { confirmationModalFeedback } from './constants';

/* interface, type, enum imports */
import { AuthStatus } from '@daigaku/common-types';

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
  // authentication context
  const { authStatus } = useAuthContext();

  // modal visibility
  const { isModalVisible, showModal, closeModal } = useModalControl();

  // component render
  const { selectedFormType, selectedFormComponent } = useFormSwitcher(showModal);

  if (authStatus === AuthStatus.SIGNED_IN) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    <main className={'mx-auto flex flex-col items-center'}>
      <FormSectionWrapper key={selectedFormType}>{selectedFormComponent}</FormSectionWrapper>
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
