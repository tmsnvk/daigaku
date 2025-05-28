/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { ResponseStatus } from '@daigaku/common-types';

/**
 * Defines response status-related operations, handling API requests and interactions for response status management.
 */
interface ResponseStatusService {
  /**
   * Retrieves all available options for the ResponseStatus field of the {@link ApplicationRecord} object.
   *
   * @return {Promise<Array<ResponseStatus>>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getAll: () => Promise<Array<ResponseStatus>>;
}

/**
 * Manages response-status-related REST API operations, implementing {@link ResponseStatusService}.
 */
export const responseStatusService: ResponseStatusService = {
  getAll: (): Promise<Array<ResponseStatus>> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Array<ResponseStatus>>({
        method: 'GET',
        url: '/api/v1/response-status',
      }));
  },
};
