/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import React, { JSX, Suspense } from 'react';

/* logic imports */
import { useAuthenticationProvider } from '@daigaku/providers';

/* component imports */
import { PrivateLayout, PublicLayout } from '@daigaku/components/layout';

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
export const RootRoute = (): JSX.Element => {
  const { state } = useAuthenticationProvider();
  const isUserAuthenticated = !!state.account.role;

  return (
    <Suspense fallback={null}>
      {isUserAuthenticated ? <PrivateLayout build={BUILD_ID} /> : <PublicLayout build={BUILD_ID} />}
      <TanStackRouterDevtools position='bottom-right' />
    </Suspense>
  );
};
