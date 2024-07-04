import { useQuery } from '@tanstack/react-query';

import { roleService } from '@services/index.ts';

import { queryKeys } from '@configuration';

const useGetStudentAndMentorAccountRoles = () => {
  return useQuery({
    queryKey: [queryKeys.ACCOUNT_ROLE.GET_STUDENT_AND_MENTOR_ROLES_AS_SELECT_OPTIONS],
    queryFn: () => roleService.getStudentAndMentorRoles(),
  });
};

export default useGetStudentAndMentorAccountRoles;
