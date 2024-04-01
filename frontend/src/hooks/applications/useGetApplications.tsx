import { useQuery } from '@tanstack/react-query';
import {
  axiosConfigWithAuth,
  queryKeys,
} from '@configuration';
import { AccountRoleE, useAuth } from '@context/AuthContext.tsx';

export type ApplicationT = {
  id: string;
  account: string;
  country: string;
  university: string;
  courseName: string;
  minorSubject: string;
  programmeLength: number;
  applicationStatus: string;
  interviewStatus: string;
  offerStatus: string;
  responseStatus: string;
  finalDestinationStatus: string;
  notes: string | null;
  createdAt: Date;
  lastUpdatedAt: Date;
}

const getUrl = (role: AccountRoleE) => {
  const roleUrl = {
    [AccountRoleE.STUDENT]: 'students',
    [AccountRoleE.MENTOR]: 'mentors',
    [AccountRoleE.ADMIN]: 'admins',
  };

  return roleUrl[role];
};

const getApplications = async (role: AccountRoleE) => {
  try {
    const roleUrl = getUrl(role);

    const { data }: { data: ApplicationT[] } = await axiosConfigWithAuth.request({
      method: 'GET',
      url: `api/applications/${roleUrl}`,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

const useGetApplications = () => {
  const { account } = useAuth();

  return useQuery({
    queryKey: [queryKeys.getApplications],
    queryFn: () => getApplications(account.role as AccountRoleE),
  });
};

export default useGetApplications;
