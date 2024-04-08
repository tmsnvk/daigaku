import { useQuery } from '@tanstack/react-query';
import {
  AccountRoleE,
  useAuth,
} from '@context/AuthContext.tsx';
import { queryKeys } from '@configuration';
import { applicationService } from '@services/index.ts';

const getUrl = (role: AccountRoleE) => {
  const roleUrl = {
    [AccountRoleE.STUDENT]: 'students',
    [AccountRoleE.MENTOR]: 'mentors',
    [AccountRoleE.ADMIN]: 'admins',
  };

  return roleUrl[role];
};

const useGetApplications = () => {
  const { account } = useAuth();
  const roleUrl = getUrl(account.role as AccountRoleE);

  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.getAllByRole(roleUrl),
  });
};

export default useGetApplications;
