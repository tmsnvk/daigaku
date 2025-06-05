/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { FinalDestinationStatus } from '@daigaku/common-types';

/**
 * Defines final destination status-related operations, handling API requests and interactions for final destination
 * status management.
 */
interface FinalDestinationStatusService {
  /**
   * Retrieves all available options for the FinalDestinationStatus field of the {@link ApplicationRecord} object.
   *
   * @return {Promise<Array<FinalDestinationStatus>>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  findList: () => Promise<Array<FinalDestinationStatus>>;
}

/**
 * Manages final-destination-status-related REST API operations, implementing {@link FinalDestinationStatusService}.
 */
export const finalDestinationStatusService: FinalDestinationStatusService = {
  findList: (): Promise<Array<FinalDestinationStatus>> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Array<FinalDestinationStatus>>({
        method: 'GET',
        url: '/api/v1/final-destination-status',
      }));
  },
};
