/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { AuthContext, useAuth } from '@context/auth';
import { applicationService } from '@services/index';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { SimpleQueryResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useGetDashboardStatistics}
 * ===============
 */

/**
 * Defines the {@link useGetDashboardStatistics} custom hook's return value properties.
 *
 * @since 0.0.1
 */
export interface DashboardStatistics {
  firmChoiceTileDto: {
    country: string;
    university: string;
    courseName: string;
  };
  finalDestinationTileDto: {
    country: string;
    university: string;
    courseName: string;
  };
  applicationsCount: number;
  plannedApplicationsCount: number;
  submittedApplicationsCount: number;
  withdrawnStatusCount: number;
  distinctCountriesCount: number;
  distinctUniversitiesCount: number;
  notSetInterviewStatusCount: number;
  offersCount: number;
}

/**
 * Manages the fetching of dashboard-related data. The data returned depends on the user's authorisation.
 *
 * @return {SimpleQueryResult<DashboardStatistics>}
 *
 * @since 0.0.1
 */
export const useGetDashboardStatistics = (): SimpleQueryResult<DashboardStatistics> => {
  // Authentication context.
  const { getRoleResource }: Partial<AuthContext> = useAuth();
  const accountRole: string = getRoleResource();

  return useQuery({
    queryKey: [queryKeys.aggregate.GET_DASHBOARD_STATISTICS],
    queryFn: () => applicationService.getDashboardStatistics(accountRole),
    refetchOnMount: 'always',
  });
};
