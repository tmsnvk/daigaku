/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { apiClient } from '@daigaku/utilities';

/* configuration, constants imports */
import { axiosConfig } from '@daigaku/configuration';

/* interface, type imports */
import { RoleOptionResponse } from '@daigaku/common-types';

/**
 * Defines role-related operations, handling API requests and interactions for role management.
 */
interface RoleService {
  /**
   * Retrieves the student and mentor role options.
   *
   * @return {Promise<Array<RoleOptionResponse>>}
   *
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  fetchStudentAndMentorOptions: () => Promise<Array<RoleOptionResponse>>;
}

/**
 * Manages role-related REST API operations, implementing {@link RoleService}.
 */
export const roleService: RoleService = {
  fetchStudentAndMentorOptions: (): Promise<Array<RoleOptionResponse>> => {
    return apiClient.serviceWrapper(() =>
      axiosConfig.request<Array<RoleOptionResponse>>({
        method: 'GET',
        url: '/api/v1/roles/student-and-mentor-options',
      }),
    );
  },
};
