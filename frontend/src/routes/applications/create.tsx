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
import { joinTw } from '@daigaku/utilities';

/* component imports */
import { CreateApplicationRecordForm } from '@daigaku/components/applications-create';

const PATH = '/applications/create';
const routeApi = getRouteApi(PATH);

/**
 *
 * @returns {JSX.Element}
 */
const CreateApplicationComponent = (): JSX.Element => {
  const countryOptions = routeApi.useLoaderData();

  return (
    <main className={joinTw('flex flex-col items-center', 'mx-auto')}>
      <CreateApplicationRecordForm countryOptions={countryOptions} />
    </main>
  );
};

export const Route = createFileRoute('/applications/create')({
  component: CreateApplicationComponent,
  loader: async () => {
    return await countryService.findOptionList();
  },
});
