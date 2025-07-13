/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { useCoreApiQuery } from '@daigaku/hooks';
import { roleService } from '@daigaku/services';

/* configuration, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { RoleOptionResponse } from '@daigaku/common-types';

/**
 * Fetches a list of {@link RoleOptionResponse} objects.
 *
 * @return {UseQueryResult<Array<RoleOptionResponse>, CoreApiError>}
 */
export const useGetPendingAccountRegistrationRoles = (): UseQueryResult<Array<RoleOptionResponse>, CoreApiError> => {
  return useCoreApiQuery(
    [queryKeys.accountRole.GET_PENDING_ACCOUNT_REGISTRATION_ROLES_AS_SELECT_OPTIONS],
    roleService.fetchStudentAndMentorOptions,
  );
};
