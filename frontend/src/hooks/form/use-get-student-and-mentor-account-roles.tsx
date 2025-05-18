/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { roleService } from '@daigaku/services';

/* configuration, utilities, constants imports */
import { queryKeys } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { ListQueryResult, RoleOption } from '@daigaku/common-types';

/**
 * Fetches a list of {@link RoleOption} objects.
 *
 * @return {ListQueryResult<RoleOption>}
 */
export const useGetStudentAndMentorAccountRoles = (): ListQueryResult<RoleOption> => {
  return useQuery({
    queryKey: [queryKeys.ACCOUNT_ROLE.GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS],
    queryFn: () => roleService.getStudentAndMentorRoles(),
  });
};
