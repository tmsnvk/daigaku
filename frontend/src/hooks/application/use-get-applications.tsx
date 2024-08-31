/**
 * @prettier
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { AccountRoleValues, AuthContext, useAuth } from '@context/auth';

/* service imports */
import { applicationService } from '@services/index';

/* configuration imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { Application, ListQueryResult } from '@common-types';

/*
 * custom hook - TODO - add functionality description
 */
export const useGetApplications = (): ListQueryResult<Application> => {
  const { account, getRoleResource }: Partial<AuthContext> = useAuth();
  const role: string = getRoleResource(account.role as AccountRoleValues);

  return useQuery({
    queryKey: [queryKeys.APPLICATION.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.getAllByRole(role),
  });
};
