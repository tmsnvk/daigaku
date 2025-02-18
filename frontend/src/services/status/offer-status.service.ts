/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { OfferStatus } from '@common-types';

/**
 * Defines offer status-related operations, handling API requests and interactions for offer status management.
 */
interface OfferStatusService {
  /**
   * Retrieves all available options for the OfferStatus field of the {@link Application} object.
   *
   * @return {Promise<Array<OfferStatus>>}
   * @throws {AxiosError}
   */
  getAll: () => Promise<Array<OfferStatus>>;
}

/**
 * Manages offer-status-related REST API operations, implementing {@link OfferStatusService}.
 */
export const offerStatusService: OfferStatusService = {
  getAll: async (): Promise<Array<OfferStatus>> => {
    const response: AxiosResponse<Array<OfferStatus>> = await axiosConfigWithAuth.request<Array<OfferStatus>>({
      method: 'GET',
      url: '/api/v1/offer-status',
    });

    return response.data;
  },
};
