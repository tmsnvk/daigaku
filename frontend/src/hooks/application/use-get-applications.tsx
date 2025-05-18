/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { useAuthContext } from '@daigaku/context';
import { applicationService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { ApplicationRecord, ListQueryResult } from '@daigaku/common-types';

/**
 * Fetches a list of application records based on the user's authorisation role.
 *
 * @return {ListQueryResult<ApplicationRecord>}
 */
export const useGetApplications = (): ListQueryResult<ApplicationRecord> => {
  const { getRoleResource } = useAuthContext();
  const accountRole = getRoleResource();

  // Do not provide accountRole as queryKey identifier. It is not needed and will break the frontend application's
  // cache mechanism.
  return useQuery({
    queryKey: [queryKeys.application.GET_ALL_BY_ROLE],
    queryFn: () => applicationService.getAllByRole(accountRole),
  });
};
