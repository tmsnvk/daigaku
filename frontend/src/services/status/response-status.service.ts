/**
 * @prettier
 */

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
import { ResponseStatus } from '@common-types';

/**
 * Defines the operations of the {@link responseStatusService} object, responsible for managing response-status-related API requests.
 */
interface ResponseStatusService {
  /**
   * Retrieves all available options for the ResponseStatus field of the {@link Application} object.
   *
   * @return {Promise<Array<ResponseStatus>>}
   * @throws {AxiosError}
   */
  getAll: () => Promise<Array<ResponseStatus>>;
}

/**
 * Manages response-status-related REST API operations, implementing {@link ResponseStatusService}.
 */
export const responseStatusService: ResponseStatusService = {
  getAll: async (): Promise<Array<ResponseStatus>> => {
    const response: AxiosResponse<Array<ResponseStatus>> = await axiosConfigWithAuth.request<Array<ResponseStatus>>({
      method: 'GET',
      url: '/api/v1/response-status',
    });

    return response.data;
  },
};
