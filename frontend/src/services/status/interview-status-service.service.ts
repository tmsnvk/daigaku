/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { InterviewStatus } from '@daigaku/common-types';

/**
 * Defines interview status-related operations, handling API requests and interactions for interview status management.
 */
interface InterviewStatusService {
  /**
   * Retrieves all available options for the InterviewStatus field of the {@link ApplicationRecord} object.
   *
   * @return {Promise<Array<InterviewStatus>>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e. email/password pair do not match or the
   *   user does not have valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  findList: () => Promise<Array<InterviewStatus>>;
}

/**
 * Manages interview-status-related REST API operations, implementing {@link InterviewStatusService}.
 */
export const interviewStatusService: InterviewStatusService = {
  findList: (): Promise<Array<InterviewStatus>> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Array<InterviewStatus>>({
        method: 'GET',
        url: '/api/v1/interview-status',
      }));
  },
};
