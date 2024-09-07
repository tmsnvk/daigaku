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
import { AccountRoleValues, AuthContext, useAuth } from '@context/auth';
import { applicationService } from '@services/index';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { SimpleQueryResult } from '@common-types';

/**
 * ===============
 * Custom Hook {@link useGetDashboardData}
 * ===============
 */

/* interfaces, types, enums */
export interface DashboardData {
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

/*
 * custom hook - TODO - add functionality description
 */
export const useGetDashboardData = (): SimpleQueryResult<DashboardData> => {
  const { account, getRoleResource }: Partial<AuthContext> = useAuth();
  const role: string = getRoleResource(account.role as AccountRoleValues);

  return useQuery({
    queryKey: [queryKeys.AGGREGATE.GET_DASHBOARD_DATA],
    queryFn: () => applicationService.getDashboardData(role),
    refetchOnMount: 'always',
  });
};
