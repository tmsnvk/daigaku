/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import React, { JSX } from 'react';

/* logic imports */
import { useAuthenticationProvider } from '@daigaku/providers';

/* component imports */
import { PrivateLayout } from './private-layout';
import { PublicLayout } from './public-layout';

/* interface, type imports */
import { UserLoginStates } from '@daigaku/common-types';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/react-router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const BUILD_ID = process.env.NODE_ENV === 'production' ? `prod-${__APP_VERSION__}` : `dev-${__APP_VERSION__}`;

/**
 *
 * @returns {JSX.Element}
 */
export const RootComponent = (): JSX.Element | null => {
  const { state } = useAuthenticationProvider();

  return (
    <>
      {state.authenticationStatus === UserLoginStates.LOGGED_IN ? (
        <PrivateLayout buildId={BUILD_ID} />
      ) : (
        <PublicLayout buildId={BUILD_ID} />
      )}
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
};
