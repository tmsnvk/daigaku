import {
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import {
  AccountRoleValues,
  AuthContext,
  useAuth,
} from '@context/auth';

import { applicationService } from '@services/index';

import { queryKeys } from '@configuration';

import { ApplicationData } from '@services/application/application.service';

export type GetApplications = UseQueryResult<Array<ApplicationData>, Error>;

const useGetApplications = (): GetApplications => {
  const { account, getRoleResource }: Partial<AuthContext> = useAuth();
  const role: string = getRoleResource(account.role as AccountRoleValues);

  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.getAllByRole(role),
  });
};

export default useGetApplications;
