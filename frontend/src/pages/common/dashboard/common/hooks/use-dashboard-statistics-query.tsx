/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { applicationService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/configuration';

/* interface, type, enum imports */
import { SimpleQueryResult, StudentDashboardStatisticsResponse } from '@daigaku/common-types';

/**
 * Manages the fetching of dashboard-related data. The data returned depends on the user's authorisation level.
 *
 * @return {SimpleQueryResult<StudentDashboardStatisticsResponse>}
 */
export const useDashboardStatisticsQuery = (): SimpleQueryResult<StudentDashboardStatisticsResponse> => {
  const { getRoleResource } = useAuthContext();
  const accountRole = getRoleResource();

  return useQuery({
    queryKey: [queryKeys.aggregate.GET_DASHBOARD_STATISTICS],
    queryFn: () => applicationService.getDashboardStatistics(accountRole),
    refetchOnMount: 'always',
  });
};
