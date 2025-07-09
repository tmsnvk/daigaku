/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { JSX } from 'react';

/* logic imports */
import { useAuthenticationProvider } from '@daigaku/providers';
import { applicationService } from '@daigaku/services';
import { getAccountRoleResource } from '@daigaku/utilities';

/* component imports */
import { DashboardIndex } from '@daigaku/components/dashboard';

/* interface, type imports */

const PATH = '/dashboard/';
const routeApi = getRouteApi(PATH);

/**
 *
 * @returns {JSX.Element}
 */
const DashboardIndexComponent = (): JSX.Element => {
  const { dashboardStatistics } = routeApi.useLoaderData();

  const { state } = useAuthenticationProvider();

  return (

      <DashboardIndex
        dashboardStatistics={dashboardStatistics}
        userRole={state.account.role}
      />

  );
};

export const Route = createFileRoute(PATH)({
  component: DashboardIndexComponent,
  loader: async ({ context }) => {
    const contextRole = context.user?.role;
    const accountRole = contextRole ? getAccountRoleResource(contextRole) : (null as never);

    const dashboardStatistics = await applicationService.fetchDashboardStatistics(accountRole);

    return {
      dashboardStatistics,
    };
  },
});
