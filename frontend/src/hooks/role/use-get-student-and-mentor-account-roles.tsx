/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* logic imports */
import { roleService } from '@services/index';

/* configuration, utilities, constants imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { ListQueryResult } from '@common-types';
import { RoleOption } from '@services/role/role.service';

/**
 * The custom hook fetches a list of {@link RoleOption} objects.
 *
 * @returns {ListQueryResult<RoleOption>}
 *
 * @since 0.0.1
 */
export const useGetStudentAndMentorAccountRoles = (): ListQueryResult<RoleOption> => {
  return useQuery({
    queryKey: [queryKeys.ACCOUNT_ROLE.GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS],
    queryFn: () => roleService.getStudentAndMentorRoles(),
  });
};
