/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { JSX } from 'react';

/* logic imports */
import { countryService } from '@daigaku/services';

/* component imports */
import { ApplicationsCreate } from '@daigaku/components/applications-create';

const PATH = '/applications/student/create';
const routeApi = getRouteApi(PATH);

/**
 *
 * @returns {JSX.Element}
 */
const RouteComponent = (): JSX.Element => {
  const { countryOptions } = routeApi.useLoaderData();

  return <ApplicationsCreate countryOptions={countryOptions} />;
};

export const Route = createFileRoute(PATH)({
  component: RouteComponent,
  loader: async () => {
    const countryOptions = await countryService.findOptionList();

    return {
      countryOptions,
    };
  },
});
