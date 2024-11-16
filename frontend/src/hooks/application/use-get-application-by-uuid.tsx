/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { applicationService } from '@services/index';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { Application, SimpleQueryResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useGetApplicationByUuid}
 * ===============
 */

/**
 * Fetches an {@link Application} object by uuid.
 * The server-side request is triggered only if the application is not in the `react-router-dom` cache.
 *
 * @param state An {@link Application} object from the local `react-router-dom` cache, if it exists, otherwise null.
 * @param applicationUuid The application's uuid.
 * @return {SimpleQueryResult<Application>}
 *
 * @since 0.0.1
 */
export const useGetApplicationByUuid = (state: Application | null, applicationUuid: string): SimpleQueryResult<Application> => {
  return useQuery({
    queryKey: [queryKeys.application.GET_BY_UUID, applicationUuid],
    queryFn: () => applicationService.getByUuid(applicationUuid),
    enabled: state === null,
  });
};
