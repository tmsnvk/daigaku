/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { applicationService } from '@daigaku/services';
import { ServerError, UnexpectedError } from '@daigaku/errors';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { ApplicationRecord } from '@daigaku/common-types';

/**
 * Fetches a list of application records based on the user's authorisation role.
 *
 * @return {UseQueryResult<Array<ApplicationRecord>, ServerError | UnexpectedError>}
 */
export const useGetApplications = (): UseQueryResult<Array<ApplicationRecord>, ServerError | UnexpectedError> => {
  const { getRoleResource } = useAuthContext();
  const accountRole = getRoleResource();

  // Do not provide accountRole as queryKey identifier. It is not needed and will break the frontend application's
  // cache mechanism.
  return useQuery({
    queryKey: [queryKeys.application.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.getAllByRole(accountRole),
  });
};
