/**
 * @prettier
 */

import { useQuery } from '@tanstack/react-query';

import { roleService } from '@services/index';

import { queryKeys } from '@configuration';

import { RoleOption } from '@services/role/role.service';
import { ListQueryResult } from '@common-types';

export const useGetStudentAndMentorAccountRoles = (): ListQueryResult<RoleOption> => {
  return useQuery({
    queryKey: [queryKeys.ACCOUNT_ROLE.GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS],
    queryFn: () => roleService.getStudentAndMentorRoles(),
  });
};
