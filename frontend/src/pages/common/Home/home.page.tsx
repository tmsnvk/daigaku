/**
 * @prettier
 */

/**
 * @fileoverview
 * @author Tamas N. <dev@tamasnovak.net>
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
import { ActiveFormComponent, ConfirmationModalControl, useActiveFormComponent, useConfirmationModal } from './home.hooks';

/* component, style imports */
import { ConfirmationModal } from '@components/notification';
import { MainContainer } from './home.styles';

/* utilities imports */
import { confirmationModalMessages } from './home.utilities';

/**
 * @description
 * The `Home` page-level component is responsible for rendering the root page of the application.
 *
 * - If the user is signed in, they are redirected to the `/dashboard` route. Otherwise, it renders the main container, and
 * one of three possible form components based on the user's selection.
 * - It displays a confirmation modal component when the `isModalVisible` state is true,
 * with a message corresponding to the current `activeFormType`.
 *
 * @see {@link LoginForm}
 * @see {@link RegistrationForm}
 * @see {@link ResetForm}
 * @see {@link useAuth}
 * @see {@link useConfirmationModal}
 * @see {@link useActiveFormComponent}
 * @see {@link ConfirmationModal}
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const Home = (): JSX.Element => {
  const { authStatus }: Partial<AuthContext> = useAuth();
  const { isModalVisible, showModal, closeModal }: ConfirmationModalControl = useConfirmationModal();
  const { activeFormType, activeFormComponent }: ActiveFormComponent = useActiveFormComponent({ showModal });

  if (authStatus === AuthStatus.SIGNED_IN) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
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
  );
};
