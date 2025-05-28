/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { apiClientWrapper } from '@daigaku/utilities';
import { axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { OfferStatus } from '@daigaku/common-types';

/**
 * Defines offer status-related operations, handling API requests and interactions for offer status management.
 */
interface OfferStatusService {
  /**
   * Retrieves all available options for the OfferStatus field of the {@link ApplicationRecord} object.
   *
   * @return {Promise<Array<OfferStatus>>}
   *
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getAll: () => Promise<Array<OfferStatus>>;
}

/**
 * Manages offer-status-related REST API operations, implementing {@link OfferStatusService}.
 */
export const offerStatusService: OfferStatusService = {
  getAll: (): Promise<Array<OfferStatus>> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Array<OfferStatus>>({
        method: 'GET',
        url: '/api/v1/offer-status',
      }));
  },
};
