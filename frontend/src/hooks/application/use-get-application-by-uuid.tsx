/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { applicationService } from '@daigaku/services';
import { useCoreApiQuery } from '../configuration/use-core-api';

/* configuration, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { ApplicationResponse } from '@daigaku/common-types';

/**
 * Fetches an application-record by its uuid string.
 * The server-side request is triggered only if the application record is not in the `react-router-dom` cache.
 *
 * @param state An application record from the local `react-router-dom` cache, if it exists, otherwise null.
 * @param uuid The Application record's uuid string.
 * @return {UseQueryResult<ApplicationResponse, CoreApiError>}
 */
export const useGetApplicationByUuid = (
  state: ApplicationResponse | null,
  uuid: string,
): UseQueryResult<ApplicationResponse, CoreApiError> => {
  return useCoreApiQuery([queryKeys.application.GET_BY_UUID, uuid], () => applicationService.findOneByUuid(uuid), {
    enabled: state === null,
  });
};
