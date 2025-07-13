/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { accountService } from '@daigaku/services';
import { localStorageUtilities } from '@daigaku/utilities';
import { useCoreApiQuery } from '../configuration/use-core-api';

/* configuration, constants imports */
import { localStorageKeys, queryKeys } from '@daigaku/constants';

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

  return useCoreApiQuery([queryKeys.account.GET_ME], () => accountService.getMe(), {
    enabled: authToken !== null,
  });
};
