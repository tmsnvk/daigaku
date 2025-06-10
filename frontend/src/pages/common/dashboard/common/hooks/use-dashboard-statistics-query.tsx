/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';
import { applicationService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { StudentDashboardStatisticsResponse } from '@daigaku/common-types';

/**
 * Manages the fetching of dashboard-related data. The data returned depends on the user's authorisation level.
 *
 * @return {UseQueryResult<StudentDashboardStatisticsResponse, UnauthorizedError | ServerError | UnexpectedError>}
 */
export const useDashboardStatisticsQuery = (): UseQueryResult<
  StudentDashboardStatisticsResponse,
  UnauthorizedError | ServerError | UnexpectedError
> => {
  const { getRoleResource } = useAuthContext();
  const accountRole = getRoleResource();

  return useQuery({
    queryKey: [queryKeys.aggregate.GET_DASHBOARD_STATISTICS],
    queryFn: () => applicationService.fetchDashboardStatistics(accountRole),
    refetchOnMount: 'always',
  });
};
