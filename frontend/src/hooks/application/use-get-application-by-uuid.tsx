/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
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
 * The custom hook fetches an {@link Application} object by UUID.
 * The server-side REST API request is launched only if the object is not in the local cache.
 *
 * @param state An `Application` object from the local `react-router-dom` cache, if it exists, otherwise null.
 * @param applicationUuid The application's uuid.
 *
 * @returns {SimpleQueryResult<Application>}
 *
 * @since 0.0.1
 */
export const useGetApplicationByUuid = (state: Application | null, applicationUuid: string): SimpleQueryResult<Application> => {
  return useQuery({
    queryKey: [queryKeys.application.GET_BY_UUID],
    queryFn: () => applicationService.getByUuid(applicationUuid),
    enabled: state === null,
  });
};
