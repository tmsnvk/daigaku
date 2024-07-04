import { useQuery } from '@tanstack/react-query';

import {
  AccountRoleE,
  useAuth,
} from '@context/AuthContext.tsx';

import { applicationService } from '@services/index.ts';

import { queryKeys } from '@configuration';

const useGetApplications = () => {
  const { account, getRoleResource } = useAuth();
  const role = getRoleResource(account.role as AccountRoleE);

  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.getAllByRole(role),
  });
};

export default useGetApplications;
