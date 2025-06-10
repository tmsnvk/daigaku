/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';
import { applicationService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { Application } from '@daigaku/common-types';

/**
 * Fetches an application-record by its uuid string.
 * The server-side request is triggered only if the application record is not in the `react-router-dom` cache.
 *
 * @param state An application record from the local `react-router-dom` cache, if it exists, otherwise null.
 * @param uuid The Application record's uuid string.
 * @return {UseQueryResult<Application, UnauthorizedError | ServerError | UnexpectedError>}
 */
export const useGetApplicationByUuid = (
  state: Application | null,
  uuid: string,
): UseQueryResult<Application, UnauthorizedError | ServerError | UnexpectedError> => {
  return useQuery({
    queryKey: [queryKeys.application.GET_BY_UUID, uuid],
    queryFn: () => applicationService.findOneByUuid(uuid),
    enabled: state === null,
  });
};
