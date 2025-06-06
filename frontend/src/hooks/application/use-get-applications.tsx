/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { ServerError, UnauthorizedError, UnexpectedError } from '@daigaku/errors';
import { applicationService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type, enum, schema imports */
import { Application } from '@daigaku/common-types';

/**
 * Fetches a list of applications based on the user's authorization role.
 *
 * @return {UseQueryResult<Array<Application>, UnauthorizedError | ServerError | UnexpectedError>}
 */
export const useGetApplications = (): UseQueryResult<
  Array<Application>,
  UnauthorizedError | ServerError | UnexpectedError
> => {
  const { getRoleResource } = useAuthContext();
  const accountRole = getRoleResource();

  return useQuery({
    queryKey: [queryKeys.application.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.findListByAccountRole(accountRole),
  });
};
