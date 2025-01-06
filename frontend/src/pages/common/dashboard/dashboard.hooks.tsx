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
import { useAuthContext } from '@context/auth';
import { applicationService } from '@services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { SimpleQueryResult, StudentDashboardStatistics } from '@common-types';

/**
 * Manages the fetching of dashboard-related data. The data returned depends on the user's authorisation level.
 *
 * @return {SimpleQueryResult<StudentDashboardStatistics>}
 */
export const useGetDashboardStatistics = (): SimpleQueryResult<StudentDashboardStatistics> => {
  const { getRoleResource } = useAuthContext();
  const accountRole = getRoleResource();

  return useQuery({
    queryKey: [queryKeys.aggregate.GET_DASHBOARD_STATISTICS],
    queryFn: () => applicationService.getDashboardStatistics(accountRole),
    refetchOnMount: 'always',
  });
};
