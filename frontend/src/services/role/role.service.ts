import { axiosConfig } from '@configuration';

export type RoleOptionT = {
  uuid: string;
  name: string;
}

const roleService = {
  getStudentAndMentorRoles: async (): Promise<RoleOptionT[]> => {
    const { data } = await axiosConfig.request({
      method: 'GET',
      url: '/api/roles/student-and-mentor',
    });

    return data;
  },
};

export default roleService;
