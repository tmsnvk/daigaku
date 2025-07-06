/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { Navigate, createFileRoute } from '@tanstack/react-router';
import { JSX } from 'react';

/* logic imports */
import { useAuthenticationProvider } from '@daigaku/providers';
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { FormSectionWrapper, useFormSelector } from '@daigaku/components/home';

/* interface, type imports */
import { UserLoginStates } from '@daigaku/common-types';

/**
 *
 * @returns {JSX.Element}
 */
const HomePageComponent = (): JSX.Element => {
  const {
    state: { authenticationStatus },
  } = useAuthenticationProvider();
  const { selectedFormType, selectedFormComponent } = useFormSelector();

  if (authenticationStatus === UserLoginStates.LOGGED_IN) {
    return <Navigate to={'/dashboard'} />;
  }

  return (
    <main className={joinTw('flex flex-col items-center', 'mx-auto')}>
      <FormSectionWrapper key={selectedFormType}>{selectedFormComponent}</FormSectionWrapper>
    </main>
  );
};

export const Route = createFileRoute('/')({
  component: HomePageComponent,
});
