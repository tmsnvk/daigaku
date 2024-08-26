/**
 * @prettier
 */

import { axiosConfig } from '@configuration';

export interface RoleOption {
  readonly uuid: string;
  readonly name: string;
}

export const roleService = {
  getStudentAndMentorRoles: async (): Promise<Array<RoleOption>> => {
    const { data } = await axiosConfig.request({
      method: 'GET',
      url: '/api/v1/roles/student-and-mentor',
    });

    return data;
  },
};
