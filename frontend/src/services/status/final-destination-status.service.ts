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
import { FinalDestinationStatus } from '@common-types';

/**
 * ===============
 * Service API Calls {@link applicationStatusService}
 * ===============
 */

/**
 * Defines the operations of the {@link applicationStatusService} object, responsible for managing final-destination-status-related API requests.
 *
 * @since 0.0.1
 */
interface FinalDestinationStatusService {
  /**
   * Retrieves all available options for the FinalDestinationStatus field of the {@link Application} object.
   *
   * @return {Promise<Array<FinalDestinationStatus>>}
   * @throws {AxiosError}
   */
  getAll: () => Promise<Array<FinalDestinationStatus>>;
}

/**
 * Manages final-destination-status-related REST API operations, implementing {@link FinalDestinationStatusService}.
 *
 * @since 0.0.1
 */
export const finalDestinationStatusService: FinalDestinationStatusService = {
  getAll: async (): Promise<Array<FinalDestinationStatus>> => {
    const response: AxiosResponse<Array<FinalDestinationStatus>> = await axiosConfigWithAuth.request<Array<FinalDestinationStatus>>({
      method: 'GET',
      url: '/api/v1/final-destination-status',
    });

    return response.data;
  },
};
