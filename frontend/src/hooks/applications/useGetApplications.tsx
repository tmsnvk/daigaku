import { useQuery } from '@tanstack/react-query';
import {
  AccountRoleE,
  useAuth,
} from '@context/AuthContext.tsx';
import { applicationService } from '@services/index.ts';
import { queryKeys } from '@configuration';

const getUrlResource = (role: AccountRoleE) => {
  const roleUrl = {
    [AccountRoleE.STUDENT]: 'students',
    [AccountRoleE.MENTOR]: 'mentors',
    [AccountRoleE.INSTITUTION_ADMIN]: 'institution_admins',
    [AccountRoleE.SYSTEM_ADMIN]: 'system_admins',
  };

  return roleUrl[role];
};

const useGetApplications = () => {
  const { account } = useAuth();
  const urlResource = getUrlResource(account.role as AccountRoleE);

  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.getAllByRole(urlResource),
  });
};

export default useGetApplications;
