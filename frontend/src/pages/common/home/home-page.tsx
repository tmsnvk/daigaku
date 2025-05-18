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
import { useFormSwitcher } from './common/hooks/use-form-switcher.tsx';

/* component imports */
import { FormSectionWrapper } from './common/components/form-section-wrapper.tsx';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { UserLoginState } from '@daigaku/common-types';

/**
 * Renders the application's root page.
 * If the user is authenticated, they are redirected to the `/dashboard` route. Otherwise, the component renders one of
 * three possible form components based on the user's selection.
 *
 * @return {JSX.Element}
 */
export const Home = (): JSX.Element => {
  const { authStatus } = useAuthContext();

  const { selectedFormType, selectedFormComponent } = useFormSwitcher();

  if (authStatus === UserLoginState.SIGNED_IN) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    <main className={joinTw('flex flex-col items-center', 'mx-auto')}>
      <FormSectionWrapper key={selectedFormType}>{selectedFormComponent}</FormSectionWrapper>
    </main>
  );
};
