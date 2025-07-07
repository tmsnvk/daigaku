/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { createRootRouteWithContext, redirect } from '@tanstack/react-router';

/* interface, type imports */
import { Account } from '@daigaku/providers';

/* component imports */
import { RootComponent } from '@daigaku/components/root';

export const Route = createRootRouteWithContext<{ user: Account | null }>()({
  beforeLoad: ({ context, location }) => {
    const isUserAuthenticated = !!context.user?.role;

    const publicRoutes = ['/', '/contact'];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!isUserAuthenticated && !isPublicRoute) {
      throw redirect({ to: '/' });
    }

    return {
      user: context.user,
    };
  },
  component: RootComponent,
});
