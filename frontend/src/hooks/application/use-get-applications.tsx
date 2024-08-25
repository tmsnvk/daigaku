/**
 * @prettier
 */

import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { AccountRoleValues, AuthContext, useAuth } from '@context/auth';
import { queryKeys } from '@configuration';

import { applicationService } from '@services/index';

import { Application } from '@custom-types/index';

export type GetApplications = UseQueryResult<Array<Application>, Error>;

export const useGetApplications = (): GetApplications => {
  const { account, getRoleResource }: Partial<AuthContext> = useAuth();
  const role: string = getRoleResource(account.role as AccountRoleValues);

  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.getAllByRole(role),
  });
};
