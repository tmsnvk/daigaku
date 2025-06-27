/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { CoreApiError } from '@daigaku/errors';
import { roleService } from '@daigaku/services';

/* configuration, constants imports */
import { queryKeys } from '@daigaku/constants';

/* interface, type imports */
import { RoleOption } from '@daigaku/common-types';

/**
 * Fetches a list of {@link RoleOption} objects.
 *
 * @return {UseQueryResult<Array<RoleOption>, CoreApiError>}
 */
export const useGetStudentAndMentorAccountRoles = (): UseQueryResult<Array<RoleOption>, CoreApiError> => {
  return useQuery({
    queryKey: [queryKeys.accountRole.GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS],
    queryFn: () => roleService.fetchStudentAndMentorOptions(),
  });
};
