/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfig } from '@configuration';

/* interface, type, enum imports */
import { RoleOption } from '@common-types';

/**
 * ===============
 * Service API Calls {@link roleService}
 * ===============
 */

/**
 * Defines the operations of the {@link roleService} object, responsible for managing role-related API requests.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
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
