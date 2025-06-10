/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfig } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type imports */
import { RoleOption } from '@daigaku/common-types';

/**
 * Defines role-related operations, handling API requests and interactions for role management.
 */
interface RoleService {
  /**
   * Retrieves the student and mentor role options.
   *
   * @return {Promise<Array<RoleOption>>}
   *
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  fetchStudentAndMentorOptions: () => Promise<Array<RoleOption>>;
}

/**
 * Manages role-related REST API operations, implementing {@link RoleService}.
 */
export const roleService: RoleService = {
  fetchStudentAndMentorOptions: (): Promise<Array<RoleOption>> => {
    return apiClientWrapper(() =>
      axiosConfig.request<Array<RoleOption>>({
        method: 'GET',
        url: '/api/v1/roles/student-and-mentor-options',
      }));
  },
};
