/**
 * @prettier
 */

import { UseQueryResult, useQuery } from '@tanstack/react-query';

import { roleService } from '@services/index';

import { queryKeys } from '@configuration';

import { RoleOption } from '@services/role/role.service';

export type StudentAndMentorAccountRoles = UseQueryResult<Array<RoleOption>, Error>;

export const useGetStudentAndMentorAccountRoles = (): StudentAndMentorAccountRoles => {
  return useQuery({
    queryKey: [queryKeys.ACCOUNT_ROLE.GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS],
    queryFn: () => roleService.getStudentAndMentorRoles(),
  });
};
