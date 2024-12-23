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
import { AuthContext, useAuth } from '@context/auth';
import { applicationService } from '@services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { DashboardStatistics, SimpleQueryResult } from '@common-types';

/**
 * Manages the fetching of dashboard-related data. The data returned depends on the user's authorisation.
 *
 * @return {SimpleQueryResult<DashboardStatistics>}
 */
export const useGetDashboardStatistics = (): SimpleQueryResult<DashboardStatistics> => {
  const { getRoleResource }: Partial<AuthContext> = useAuth();
  const accountRole: string = getRoleResource();

  return useQuery({
    queryKey: [queryKeys.aggregate.GET_DASHBOARD_STATISTICS],
    queryFn: () => applicationService.getDashboardStatistics(accountRole),
    refetchOnMount: 'always',
  });
};
