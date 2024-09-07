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

/* interfaces, types, enums */
export interface DashboardStatistics {
  firmChoiceDto: {
    country: string;
    university: string;
    courseName: string;
  };
  finalDestinationDto: {
    country: string;
    university: string;
    courseName: string;
  };
  numberOfApplications: number;
  numberOfPlannedStatus: number;
  numberOfSubmittedStatus: number;
  numberOfWithdrawnStatus: number;
  numberOfDifferentCountries: number;
  numberOfDifferentUniversities: number;
  numberOfNotSetInterviewStatus: number;
  numberOfOffers: number;
}

/**
 * @description
 * The custom hook manages fetch of dashboard-related data. The data returned depends on the user's authorisation.
 *
 * @returns {SimpleQueryResult<DashboardStatistics>} -  A `react-query` mutation object.
 *
 * @since 0.0.1
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
