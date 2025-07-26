/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* logic imports */
import { apiClient } from 'utilities/api-client';

/* configuration, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';

/* interface, type imports */
import { ApplicationResponse, StudentDashboardStatisticsResponse } from '@daigaku/common-types';

/**
 * Defines generic-application operations, handling API requests, and interactions for application management.
 */
interface ApplicationService {
  /**
   * Retrieves a specific application by its uuid.
   *
   * @param uuid The application-record's uuid.
   * @return {Promise<ApplicationResponse>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e., an email/password pair do not match or
   *   the user does not have a valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  findOneByUuid: (uuid: string) => Promise<ApplicationResponse>;

  /**
   * Retrieves dashboard statistics relevant to the user's authorization role.
   *
   * @param accountRole The user's authorization role.
   * @return {Promise<StudentDashboardStatisticsResponse>}
   *
   * @throws {UnauthorizedError} If the user enters incorrect form data, i.e., an email/password pair do not match or
   *   the user does not have a valid token.
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  fetchDashboardStatistics: (accountRole: string) => Promise<StudentDashboardStatisticsResponse>;
}

/**
 * Manages application-related REST API operations, implementing {@link ApplicationService}.
 */
export const applicationService: ApplicationService = {
  findOneByUuid: (uuid: string): Promise<ApplicationResponse> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<ApplicationResponse>({
        method: 'GET',
        url: `/api/v1/applications/${uuid}`,
      }),
    );
  },
  fetchDashboardStatistics: (accountRole: string): Promise<StudentDashboardStatisticsResponse> => {
    return apiClient.serviceWrapper(() =>
      axiosConfigWithAuth.request<StudentDashboardStatisticsResponse>({
        method: 'GET',
        url: `/api/v1/applications/statistics/dashboard`,
        params: { role: accountRole },
      }),
    );
  },
};
