/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

/* logic imports */
import { useAuthenticationProvider } from '@daigaku/providers';
import { joinTw } from '@daigaku/utilities';
import { useFormSwitcher } from './common/hooks/use-form-switcher.tsx';

/* component imports */
import { FormSectionWrapper } from './common/components/form-section-wrapper.tsx';

/* interface, type imports */
import { UserLoginStates } from '@daigaku/common-types';

/**
 * Renders the application's root page.
 * If the user is authenticated, they are redirected to the `/dashboard` route. Otherwise, the component renders one of
 * three possible form components based on the user's selection.
 *
 * @return {JSX.Element}
 */
export const Home = (): JSX.Element => {
  const { state } = useAuthenticationProvider();
  const { selectedFormType, selectedFormComponent } = useFormSwitcher();

  if (state.authenticationStatus === UserLoginStates.LOGGED_IN) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    <main className={joinTw('flex flex-col items-center', 'mx-auto')}>
      <FormSectionWrapper key={selectedFormType}>{selectedFormComponent}</FormSectionWrapper>
    </main>
  );
};
