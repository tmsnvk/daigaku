/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { useAuthenticationProvider } from '@daigaku/providers';
import { applicationService } from '@daigaku/services';
import { getAccountRoleResource } from '@daigaku/utilities';

/* configuration,, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { Application } from '@daigaku/common-types';

/**
 * Fetches a list of applications based on the user's authorization role.
 *
 * @return {UseQueryResult<Array<Application>, CoreApiError>}
 */
export const useGetApplications = (): UseQueryResult<Array<Application>, CoreApiError> => {
  const { state } = useAuthenticationProvider();
  const accountRole = getAccountRoleResource(state.account.role);

  return useQuery({
    queryKey: [queryKeys.application.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.findListByAccountRole(accountRole),
  });
};
