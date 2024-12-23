/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { applicationService } from '@services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { Application, SimpleQueryResult } from '@common-types';

/**
 * Fetches an {@link Application} object by uuid.
 * The server-side request is triggered only if the application is not in the `react-router-dom` cache.
 *
 * @param state An {@link Application} object from the local `react-router-dom` cache, if it exists, otherwise null.
 * @param applicationUuid The application's uuid.
 * @return {SimpleQueryResult<Application>}
 */
export const useGetApplicationByUuid = (state: Application | null, applicationUuid: string): SimpleQueryResult<Application> => {
  return useQuery({
    queryKey: [queryKeys.application.GET_BY_UUID, applicationUuid],
    queryFn: () => applicationService.getByUuid(applicationUuid),
    enabled: state === null,
  });
};
