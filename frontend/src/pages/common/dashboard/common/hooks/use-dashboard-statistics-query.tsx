/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';
import { useAuthenticationProvider } from '@daigaku/providers';
import { applicationService } from '@daigaku/services';
import { getAccountRoleResource } from '@daigaku/utilities';

/* configuration, constants imports */
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
  const { state } = useAuthenticationProvider();
  const accountRole = getAccountRoleResource(state.account.role);

  return useQuery({
    queryKey: [queryKeys.aggregate.GET_DASHBOARD_STATISTICS],
    queryFn: () => applicationService.fetchDashboardStatistics(accountRole),
    refetchOnMount: 'always',
  });
};
