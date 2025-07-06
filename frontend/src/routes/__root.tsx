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
import { RootRoute } from '@daigaku/components/root';

export const Route = createRootRouteWithContext<{ user: Account | null }>()({
  beforeLoad: async ({ context, location }) => {
    const isUserAuthenticated = !!context.user?.role;

    const publicRoutes = ['/', '/contact'];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!isUserAuthenticated) {
      if (!isPublicRoute) {
        throw redirect({ to: '/' });
      }

      return {
        user: null,
      };
    }

    if (isUserAuthenticated && isPublicRoute) {
      throw redirect({ to: '/dashboard' });
    }

    return {
      user: context.user,
    };
  },
  component: RootRoute,
});
