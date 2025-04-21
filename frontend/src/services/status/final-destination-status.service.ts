/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type, enum imports */
import { FinalDestinationStatus } from '@daigaku/common-types';

/**
 * Defines final destination status-related operations, handling API requests and interactions for final destination
 * status management.
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
 */
export const finalDestinationStatusService: FinalDestinationStatusService = {
  getAll: async (): Promise<Array<FinalDestinationStatus>> => {
    const response: AxiosResponse<Array<FinalDestinationStatus>> = await axiosConfigWithAuth.request<
      Array<FinalDestinationStatus>
    >({
      method: 'GET',
      url: '/api/v1/final-destination-status',
    });

    return response.data;
  },
};
