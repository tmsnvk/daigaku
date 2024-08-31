/**
 * @prettier
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { AccountRoleValues, AuthContext, useAuth } from '@context/auth';

/* service imports */
import { applicationService } from '@services/index';

/* configuration imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { SimpleQueryResult } from '@common-types';

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
