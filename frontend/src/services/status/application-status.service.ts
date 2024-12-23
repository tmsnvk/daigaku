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
import { ApplicationStatus } from '@common-types';

/**
 * Defines the operations of the {@link applicationStatusService} object, responsible for managing application-status-related API requests.
 */
interface ApplicationStatusService {
  /**
   * Retrieves all available options for the ApplicationStatus field of the {@link Application} object.
   *
   * @return {Promise<Array<ApplicationStatus>>}
   * @throws {AxiosError}
   */
  getAll: () => Promise<Array<ApplicationStatus>>;
}

/**
 * Manages application-status-related REST API operations, implementing {@link ApplicationStatusService}.
 */
export const applicationStatusService: ApplicationStatusService = {
  getAll: async (): Promise<Array<ApplicationStatus>> => {
    const response: AxiosResponse<Array<ApplicationStatus>> = await axiosConfigWithAuth.request<Array<ApplicationStatus>>({
      method: 'GET',
      url: '/api/v1/application-status',
    });

    return response.data;
  },
};
