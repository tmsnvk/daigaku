/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseQueryResult, useQuery } from '@tanstack/react-query';

/* logic imports */
import { roleService } from '@daigaku/services';
import { ServerError, UnexpectedError } from '@daigaku/errors';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { RoleOption } from '@daigaku/common-types';

/**
 * Fetches a list of {@link RoleOption} objects.
 *
 * @return {UseQueryResult<Array<RoleOption>, ServerError | UnexpectedError>}
 */
export const useGetStudentAndMentorAccountRoles = (): UseQueryResult<
  Array<RoleOption>,
  ServerError | UnexpectedError
> => {
  return useQuery({
    queryKey: [queryKeys.ACCOUNT_ROLE.GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS],
    queryFn: () => roleService.getStudentAndMentorRoles(),
  });
};
