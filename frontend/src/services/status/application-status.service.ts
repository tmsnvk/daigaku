/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { ApplicationStatus } from '@daigaku/common-types';

/**
 * Defines application status-related operations, handling API requests and interactions for application status
 * management.
 */
interface ApplicationStatusService {
  /**
   * Retrieves all available options for the ApplicationStatus field of the {@link ApplicationRecord} object.
   *
   * @return {Promise<Array<ApplicationStatus>>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   user does not have valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getAll: () => Promise<Array<ApplicationStatus>>;
}

/**
 * Manages application-status-related REST API operations, implementing {@link ApplicationStatusService}.
 */
export const applicationStatusService: ApplicationStatusService = {
  getAll: (): Promise<Array<ApplicationStatus>> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Array<ApplicationStatus>>({
        method: 'GET',
        url: '/api/v1/application-status',
      }));
  },
};
