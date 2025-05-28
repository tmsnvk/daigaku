/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { applicationService } from '@daigaku/services';
import { ServerError, UnexpectedError } from '@daigaku/errors';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { StudentDashboardStatisticsResponse } from '@daigaku/common-types';

/**
 * Manages the fetching of dashboard-related data. The data returned depends on the user's authorisation level.
 *
 * @return {UseQueryResult<StudentDashboardStatisticsResponse, ServerError | UnexpectedError>}
 */
export const useDashboardStatisticsQuery = (): UseQueryResult<
  StudentDashboardStatisticsResponse,
  ServerError | UnexpectedError
> => {
  const { getRoleResource } = useAuthContext();
  const accountRole = getRoleResource();

  return useQuery({
    queryKey: [queryKeys.aggregate.GET_DASHBOARD_STATISTICS],
    queryFn: () => applicationService.getDashboardStatistics(accountRole),
    refetchOnMount: 'always',
  });
};
