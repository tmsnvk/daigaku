/**
 * @prettier
 */

/* external imports */
import { useQuery } from '@tanstack/react-query';

/* service imports */
import { roleService } from '@services/index';

/* configuration imports */
import { queryKeys } from '@configuration';

/* interface, type, enum imports */
import { RoleOption } from '@services/role/role.service';
import { ListQueryResult } from '@common-types';

/*
* custom hook - TODO - add functionality description
*/
export const useGetStudentAndMentorAccountRoles = (): ListQueryResult<RoleOption> => {
  return useQuery({
    queryKey: [queryKeys.ACCOUNT_ROLE.GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS],
    queryFn: () => roleService.getStudentAndMentorRoles(),
  });
};
