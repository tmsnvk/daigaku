import { useQuery } from '@tanstack/react-query';

import {
  AccountRoleValues,
  AuthContext,
  useAuth,
} from '@context/auth';

import { applicationService } from '@services/index';

import { queryKeys } from '@configuration';

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

const useGetDashboardData = () => {
  const { account, getRoleResource }: Partial<AuthContext> = useAuth();
  const role: string = getRoleResource(account.role as AccountRoleValues);

  return useQuery({
    queryKey: [queryKeys.AGGREGATE.GET_DASHBOARD_DATA],
    queryFn: () => applicationService.getDashboardData(role),
    refetchOnMount: 'always',
  });
};

export {
  useGetDashboardData,
};
