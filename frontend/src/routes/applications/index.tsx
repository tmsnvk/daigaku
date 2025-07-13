/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { JSX } from 'react';

/* logic imports */
import { applicationService } from '@daigaku/services';
import { getAccountRoleResource } from '@daigaku/utilities';

/* component imports */
import { ApplicationsIndex } from '@daigaku/components/applications';

const PATH = '/applications/';
const routeApi = getRouteApi(PATH);

/**
 *
 * @returns {JSX.Element}
 */
const RouteComponent = (): JSX.Element => {
  const { initialApplications } = routeApi.useLoaderData();

  return <ApplicationsIndex initialApplications={initialApplications} />;
};

export const Route = createFileRoute(PATH)({
  component: RouteComponent,
  loader: async ({ context }) => {
    const contextRole = context.user?.role;
    const accountRole = contextRole ? getAccountRoleResource(contextRole) : (null as never);

    const initialApplications = await applicationService.findListByAccountRole(accountRole);

    return {
      initialApplications,
    };
  },
});
