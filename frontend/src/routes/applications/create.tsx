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

const PATH = '/applications/create';
const routeApi = getRouteApi(PATH);

/**
 *
 * @returns {JSX.Element}
 */
const CreateApplicationComponent = (): JSX.Element => {
  const { countryOptions } = routeApi.useLoaderData();

  return <ApplicationsCreate countryOptions={countryOptions} />;
};

export const Route = createFileRoute(PATH)({
  component: CreateApplicationComponent,
  loader: async () => {
    const countryOptions = await countryService.findOptionList();

    return {
      countryOptions,
    };
  },
});
