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

/* interface, type, enum, schema imports */
import { ApplicationRecord } from '@daigaku/common-types';

/**
 * Fetches an application-record by its uuid string.
 * The server-side request is triggered only if the application record is not in the `react-router-dom` cache.
 *
 * @param state An application record from the local `react-router-dom` cache, if it exists, otherwise null.
 * @param applicationUuid The Application record's uuid string.
 * @return {UseQueryResult<ApplicationRecord, UnauthorizedError | ServerError | UnexpectedError>}
 */
export const useGetApplicationByUuid = (
  state: ApplicationRecord | null,
  applicationUuid: string,
): UseQueryResult<ApplicationRecord, UnauthorizedError | ServerError | UnexpectedError> => {
  return useQuery({
    queryKey: [queryKeys.application.GET_BY_UUID, applicationUuid],
    queryFn: () => applicationService.getByUuid(applicationUuid),
    enabled: state === null,
  });
};
