import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@configuration';
import { roleService } from '@services/index.ts';

const useGetStudentAndMentorAccountRoles = () => {
  return useQuery({
    queryKey: [queryKeys.ACCOUNT_ROLE.GET_STUDENT_AND_MENTOR_ROLES_AS_OPTIONS],
    queryFn: () => roleService.getStudentAndMentorRoles(),
  });
};

export default useGetStudentAndMentorAccountRoles;
