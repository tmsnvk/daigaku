/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

/* external imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@configuration';

/* interface, type, enum imports */
import { InterviewStatus } from '@common-types';

/**
 * ===============
 * Service API Calls {@link interviewStatusService}
 * ===============
 */

/**
 * Defines the operations of the {@link interviewStatusService} object, responsible for managing interview-status-related API requests.
 *
 * @since 0.0.1
 */
interface InterviewStatusService {
  /**
   * Retrieves all available options for the InterviewStatus field of the {@link Application} object.
   *
   * @return {Promise<Array<InterviewStatus>>}
   * @throws {AxiosError}
   */
  getAll: () => Promise<Array<InterviewStatus>>;
}

/**
 * Manages interview-status-related REST API operations, implementing {@link InterviewStatusService}.
 *
 * @since 0.0.1
 */
export const interviewStatusService: InterviewStatusService = {
  getAll: async (): Promise<Array<InterviewStatus>> => {
    const response: AxiosResponse<Array<InterviewStatus>> = await axiosConfigWithAuth.request<Array<InterviewStatus>>({
      method: 'GET',
      url: '/api/v1/interview-status',
    });

    return response.data;
  },
};
