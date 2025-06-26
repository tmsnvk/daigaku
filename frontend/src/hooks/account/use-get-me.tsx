/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { accountService } from '@daigaku/services';
import { CoreApiError } from 'errors/core-api-error';

/* configuration, utilities, constants imports */
import { localStorageKeys } from 'constants/local-storage-keys.constant';
import { queryKeys } from 'constants/query-keys.constant';
import { localStorageUtilities } from 'utilities/local-storage';

/* interface, type imports */
import { LoginResponse } from '@daigaku/common-types';

/**
 * Manages the fetching of basic details of the logged-in user. The fetch operation is enabled only if a JWT
 * authorization token exists.
 *
 * @param authToken The authorization JWT token if it exists.
 * @returns {UseQueryResult<LoginResponse, CoreApiError>}
 */
export const useGetMe = (): UseQueryResult<LoginResponse, CoreApiError> => {
  const authToken: string | null = localStorageUtilities.getObjectById(localStorageKeys.AUTHENTICATION_TOKEN, null);

  return useQuery({
    queryKey: [queryKeys.account.GET_ME],
    queryFn: () => accountService.getMe(),
    enabled: authToken !== null,
  });
};
