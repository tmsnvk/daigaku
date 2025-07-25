/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { JSX } from 'react';
import { routeTree } from '../routeTree.gen';

/* logic imports */
import { useAuthenticationProvider } from '@daigaku/providers';

/* component imports */
import { CoreLoadingNotification } from '@daigaku/components/common/core';

/* interface, type imports */
import { UserLoginStates } from '@daigaku/common-types';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    user: null,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

/**
 *
 * @returns {JSX.Element}
 */
export const Router = (): JSX.Element => {
  const { state } = useAuthenticationProvider();

  if (state.authenticationStatus === UserLoginStates.LOADING) {
    return <CoreLoadingNotification />;
  }

  return (
    <RouterProvider
      router={router}
      context={{
        user: state.account,
      }}
    />
  );
};
