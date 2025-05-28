/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { axiosConfigWithAuth } from '@daigaku/configuration';
import { apiClientWrapper } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import { ApplicationRecord, StudentDashboardStatisticsResponse } from '@daigaku/common-types';

/**
 * Defines generic-application operations, handling API requests and interactions for application management.
 */
interface ApplicationService {
  /**
   * Retrieves a specific application by its uuid.
   *
   * @param applicationUuid The application-record's uuid.
   * @return {Promise<ApplicationRecord>}
   *
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getByUuid: (applicationUuid: string) => Promise<ApplicationRecord>;

  /**
   * Fetches a list of applications accessible based on the user's authorization role.
   *
   * @param accountRole The user's authorization role.
   * @return {Promise<Array<ApplicationRecord>>}
   *
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getAllByRole: (roleResource: string) => Promise<Array<ApplicationRecord>>;

  /**
   * Retrieves dashboard statistics relevant to the user's authorization role.
   *
   * @param accountRole The user's authorization role.
   * @return {Promise<StudentDashboardStatisticsResponse>}
   *
   * @throws {ServerError} If the server fails unexpectedly.
   * @throws {UnexpectedError} For any non-Axios or unrecognized error.
   */
  getDashboardStatistics: (roleResource: string) => Promise<StudentDashboardStatisticsResponse>;
}

/**
 * Manages application-related REST API operations, implementing {@link ApplicationService}.
 */
export const applicationService: ApplicationService = {
  getByUuid: (applicationUuid: string): Promise<ApplicationRecord> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<ApplicationRecord>({
        method: 'GET',
        url: `/api/v1/applications/${applicationUuid}`,
      }));
  },
  getAllByRole: (accountRole: string): Promise<Array<ApplicationRecord>> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<Array<ApplicationRecord>>({
        method: 'GET',
        url: `/api/v1/applications/${accountRole}`,
      }));
  },
  getDashboardStatistics: (accountRole: string): Promise<StudentDashboardStatisticsResponse> => {
    return apiClientWrapper(() =>
      axiosConfigWithAuth.request<StudentDashboardStatisticsResponse>({
        method: 'GET',
        url: `/api/v1/applications/${accountRole}/dashboard`,
      }));
  },
};
