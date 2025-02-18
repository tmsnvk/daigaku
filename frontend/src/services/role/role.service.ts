/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfig } from '@configuration';

/* interface, type, enum imports */
import { RoleOption } from '@common-types';

/**
 * Defines role-related operations, handling API requests and interactions for role management.
 */
interface RoleService {
  /**
   * Retrieves the student and mentor role options.
   *
   * @return {Promise<Array<RoleOption>>}
   * @throws {AxiosError}
   */
  getStudentAndMentorRoles: () => Promise<Array<RoleOption>>;
}

/**
 * Manages role-related REST API operations, implementing {@link RoleService}.
 */
export const roleService: RoleService = {
  getStudentAndMentorRoles: async (): Promise<Array<RoleOption>> => {
    const response: AxiosResponse<Array<RoleOption>> = await axiosConfig.request<Array<RoleOption>>({
      method: 'GET',
      url: '/api/v1/roles/student-and-mentor',
    });

    return response.data;
  },
};
