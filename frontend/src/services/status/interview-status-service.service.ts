/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { AxiosResponse } from 'axios';

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type, enum, schema imports */
import { InterviewStatus } from '@daigaku/common-types';

/**
 * Defines interview status-related operations, handling API requests and interactions for interview status management.
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
