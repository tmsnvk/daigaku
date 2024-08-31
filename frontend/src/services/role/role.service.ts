/**
 * @prettier
 */

/* configuration imports */
import { axiosConfig } from '@configuration';

/* interfaces, types, enums */
export interface RoleOption {
  readonly uuid: string;
  readonly name: string;
}

export const roleService = {
  /*
   * TODO - comment
   */
  getStudentAndMentorRoles: async (): Promise<Array<RoleOption>> => {
    const { data } = await axiosConfig.request({
      method: 'GET',
      url: '/api/v1/roles/student-and-mentor',
    });

    return data;
  },
};
