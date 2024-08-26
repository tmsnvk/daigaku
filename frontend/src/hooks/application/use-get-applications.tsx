/**
 * @prettier
 */

import { useQuery } from '@tanstack/react-query';

import { AccountRoleValues, AuthContext, useAuth } from '@context/auth';

import { applicationService } from '@services/index';

import { queryKeys } from '@configuration';

import { Application, ListQueryResult } from '@common-types';

export const useGetApplications = (): ListQueryResult<Application> => {
  const { account, getRoleResource }: Partial<AuthContext> = useAuth();
  const role: string = getRoleResource(account.role as AccountRoleValues);

  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.getAllByRole(role),
  });
};
