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

/* component imports */
import { ApplicationsEdit } from '@daigaku/components/applications-edit';

const PATH = '/applications/edit/$applicationId';
const routeApi = getRouteApi(PATH);

/**
 *
 * @returns {JSX.Element}
 */
const ApplicationEditComponent = (): JSX.Element => {
  const { data } = routeApi.useLoaderData();

  return <ApplicationsEdit application={data} />;
};

export const Route = createFileRoute(PATH)({
  component: ApplicationEditComponent,
  loader: async ({ params: { applicationId } }) => {
    const data = await applicationService.findOneByUuid(applicationId);

    return {
      data,
    };
  },
});
