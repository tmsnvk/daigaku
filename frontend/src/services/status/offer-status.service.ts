/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { OfferStatus } from '@common-types';

/**
 * ===============
 * Service API Calls {@link offerStatusService}
 * ===============
 */

/**
 * Defines the operations of the {@link offerStatusService} object, responsible for managing offer-status-related API requests.
 *
 * @since 0.0.1
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
 *
 * @since 0.0.1
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
