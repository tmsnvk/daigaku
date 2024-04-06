import { useQuery } from '@tanstack/react-query';
import {
  queryKeys,
  axiosConfigWithAuth,
} from '@configuration';
import {
  AccountRoleE,
  useAuth,
} from '@context/AuthContext.tsx';

export type DashboardDataT = {
  firmChoiceCountry: string;
  firmChoiceUniversity: string;
  firmChoiceCourseName: string;
  finalDestinationCountry: string;
  finalDestinationUniversity: string;
  finalDestinationCourseName: string;
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
    [AccountRoleE.ADMIN]: 'admins',
  };

  return roleType[role];
};

const getDashboardData = async (role: AccountRoleE) => {
  try {
    const userType = getDashboardType(role);

    const { data }: { data: DashboardDataT } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: `api/applications/${userType}/dashboard-data`,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetDashboardData = () => {
  const { account } = useAuth();

  return useQuery({
    queryKey: [queryKeys.AGGREGATE.GET_DASHBOARD_DATA],
    queryFn: () => getDashboardData(account.role as AccountRoleE),
    refetchOnMount: 'always',
  });
};

export {
  useGetDashboardData,
};
