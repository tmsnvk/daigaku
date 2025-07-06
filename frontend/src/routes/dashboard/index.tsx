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
import { getAccountRoleResource, joinTw } from '@daigaku/utilities';

/* component imports */
import { LayoutStudent } from '@daigaku/components/dashboard';

/* interface, type imports */
import { UserRoles } from '@daigaku/common-types';

const PATH = '/dashboard/';
const routeApi = getRouteApi(PATH);

/**
 *
 * @returns {JSX.Element}
 */
const DashboardIndexComponent = (): JSX.Element => {
  const { state } = useAuthenticationProvider();

  const loaderData = routeApi.useLoaderData();

  return (
    <main className={joinTw('flex flex-row flex-wrap gap-y-20', 'm-[5%]')}>
      {loaderData && state.account.role === UserRoles.ROLE_STUDENT && <LayoutStudent data={loaderData} />}
    </main>
  );
};

export const Route = createFileRoute('/dashboard/')({
  component: DashboardIndexComponent,
  loader: async ({ context }) => {
    const contextRole = context.user?.role;
    const accountRole = contextRole ? getAccountRoleResource(contextRole) : (null as never);

    return await applicationService.fetchDashboardStatistics(accountRole);
  },
});
