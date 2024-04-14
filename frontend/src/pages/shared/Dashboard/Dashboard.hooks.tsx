import { useQuery } from '@tanstack/react-query';
import {
  AccountRoleE,
  useAuth,
} from '@context/AuthContext.tsx';
import { applicationService } from '@services/index.ts';
import { queryKeys } from '@configuration';

export type DashboardDataT = {
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

const getDashboardType = (role: AccountRoleE) => {
  const roleType = {
    [AccountRoleE.STUDENT]: 'students',
    [AccountRoleE.MENTOR]: 'mentors',
    [AccountRoleE.INSTITUTION_ADMIN]: 'institution_admins',
    [AccountRoleE.SYSTEM_ADMIN]: 'system_admins',
  };

  return roleType[role];
};

const useGetDashboardData = () => {
  const { account } = useAuth();
  const userType = getDashboardType(account.role as AccountRoleE);

  return useQuery({
    queryKey: [queryKeys.AGGREGATE.GET_DASHBOARD_DATA],
    queryFn: () => applicationService.getDashboardData(userType),
    refetchOnMount: 'always',
  });
};

export {
  useGetDashboardData,
};
